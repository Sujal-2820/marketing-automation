import re

class GuardrailEngine:
    def __init__(self):
        print("Initializing Brand Guardrail Engine...")

    def validate_campaign(self, campaign_text, max_allowed_discount, brand_name):
        print(f"Validating campaign against {brand_name} policies (Max Discount: {max_allowed_discount}%)...")
        
        # Look for discount percentages in text
        matches = re.findall(r'(\d+)%', campaign_text)
        
        for match in matches:
            discount_offered = int(match)
            if discount_offered > max_allowed_discount:
                print(f"[WARNING] Hallucination Detected: LLM offered {discount_offered}% but {brand_name} only allows {max_allowed_discount}%!")
                return False, f"Campaign violates {brand_name} discount policy."
                
        return True, "Campaign is policy compliant."
