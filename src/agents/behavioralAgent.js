/**
 * Agent 2: Behavioral Agent (The STP Engine)
 * Role: Analyzes tokenized data to perform Segmentation, Targeting, and Positioning.
 */

export const analyzeBehavior = (tokenizedCustomer, newPurchase = null) => {
  console.log("[Behavioral Agent] Analyzing behavioral patterns...");
  
  const segments = [...tokenizedCustomer.segments];
  let isAnomaly = false;
  let targetPositioning = "Standard Retention";

  // STP Logic: Detect anomalies in buying patterns
  if (newPurchase) {
    if (newPurchase.category === "Snacks" && segments.includes("Sneakerhead")) {
      console.log("[Behavioral Agent] ANOMALY DETECTED: Sneakerhead purchasing Snacks.");
      isAnomaly = true;
      targetPositioning = "Fusion Campaign: Sneakers + Snacks";
      
      // Update segments dynamically
      if (!segments.includes("Snack Lover")) {
        segments.push("Snack Lover");
      }
    }
  }

  return {
    token_id: tokenizedCustomer.token_id,
    updatedSegments: segments,
    isAnomaly,
    targetPositioning,
    consentFlags: tokenizedCustomer.consent_flags
  };
};
