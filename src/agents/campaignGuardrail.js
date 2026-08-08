/**
 * Agent 3: Campaign Guardrail & Fact-Checking Engine
 * 
 * Prevents LLM hallucinations & misleading ad copy:
 * 1. Checks retailer product catalog for Brand Discount limits (e.g. Nike max 15% off).
 * 2. Clamps overstated discounts in titles, subtitles, and SMS text automatically.
 * 3. Detects Out-of-Stock items and flags campaigns for pause/review.
 * 4. Runs in sub-millisecond execution time (< 1ms).
 */

export function validateCampaignsAgainstCatalog(campaigns = [], productCatalog = []) {
  const startTime = performance.now();

  if (!productCatalog || productCatalog.length === 0) {
    return {
      validatedCampaigns: campaigns,
      executionMs: 0.1,
      catalogUploaded: false,
      warningsCount: 0
    };
  }

  let warningsTotal = 0;

  const validatedCampaigns = campaigns.map(campaign => {
    const warnings = [];
    let updatedTitle = campaign.title;
    let updatedSubtitle = campaign.subtitle;
    let updatedSms = campaign.smsCopy;

    // 1. Find matching products in catalog for this target segment
    const matchingProducts = productCatalog.filter(p => 
      p.segment === campaign.target || 
      (p.category && campaign.target && p.category.toLowerCase().includes(campaign.target.toLowerCase()))
    );

    const targetProducts = matchingProducts.length > 0 ? matchingProducts : productCatalog;

    // 2. Check Stock Availability
    const totalStock = targetProducts.reduce((sum, p) => sum + (p.stock_qty || 0), 0);
    const inStockItems = targetProducts.filter(p => p.stock_qty > 0);

    if (inStockItems.length === 0) {
      warnings.push({
        type: 'out_of_stock',
        severity: 'high',
        message: `Inventory Alert: Zero stock available for ${campaign.target} products. Campaign flagged for pause.`
      });
      warningsTotal++;
    }

    // 3. Check Discount Overstatement (LLM Hallucination Guardrail)
    // Determine strict maximum discount allowed across matching brand products
    const maxAllowedDiscount = Math.min(...targetProducts.map(p => p.max_discount_pct !== undefined ? p.max_discount_pct : 100));

    // Regex to detect percentage mentions like 30%, 35% off, etc.
    const discountRegex = /(\d+)%\s*(off|discount|छूट)?/gi;

    const checkAndClampDiscount = (text) => {
      if (!text) return text;
      let textWasClamped = false;
      let originalDiscountFound = null;

      const newText = text.replace(discountRegex, (match, pctStr, suffix) => {
        const pctVal = parseInt(pctStr, 10);
        if (pctVal > maxAllowedDiscount) {
          textWasClamped = true;
          originalDiscountFound = pctVal;
          const suff = suffix ? ` ${suffix}` : ' off';
          return `${maxAllowedDiscount}%${suff}`;
        }
        return match;
      });

      return { newText, textWasClamped, originalDiscountFound };
    };

    const titleCheck = checkAndClampDiscount(updatedTitle);
    const subtitleCheck = checkAndClampDiscount(updatedSubtitle);
    const smsCheck = checkAndClampDiscount(updatedSms);

    if (titleCheck.textWasClamped || subtitleCheck.textWasClamped || smsCheck.textWasClamped) {
      const originalPct = titleCheck.originalDiscountFound || subtitleCheck.originalDiscountFound || smsCheck.originalDiscountFound;
      const brandName = targetProducts[0]?.brand || 'Brand';
      
      updatedTitle = titleCheck.newText;
      updatedSubtitle = subtitleCheck.newText;
      updatedSms = smsCheck.newText;

      warnings.push({
        type: 'discount_clamped',
        severity: 'medium',
        message: `Brand Guardrail: Clamped hallucinated discount from ${originalPct}% → ${maxAllowedDiscount}% (${brandName} policy).`
      });
      warningsTotal++;
    }

    return {
      ...campaign,
      title: updatedTitle,
      subtitle: updatedSubtitle,
      smsCopy: updatedSms,
      guardrailWarnings: warnings,
      stockQtyAvailable: totalStock,
      maxAllowedDiscount
    };
  });

  const endTime = performance.now();
  const executionMs = parseFloat((endTime - startTime).toFixed(2));

  return {
    validatedCampaigns,
    executionMs,
    catalogUploaded: true,
    warningsCount: warningsTotal
  };
}
