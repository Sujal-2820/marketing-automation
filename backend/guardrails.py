import re

class GuardrailEngine:
    def __init__(self):
        print("Initializing Enterprise Brand & Safety Guardrail Engine...")
        self.restricted_terms_regex = re.compile(
            r'\b(breast|breasts|nudity|nude|sexual|sex|erotic|cleavage|bikini|lingerie|revealing|body tight|tight clothes|tight outfit|tight wear|vulgar|vulgarity|explicit|nsfw|exposed body|underwear|bare skin|topless|bottomless|transparent)\b',
            re.IGNORECASE
        )

    def validate_campaign(self, campaign_text, max_allowed_discount, brand_name):
        print(f"Validating campaign against {brand_name} policies (Max Discount: {max_allowed_discount}%)...")
        
        # Look for discount percentages in text
        matches = re.findall(r'(\d+)%', campaign_text)
        
        for match in matches:
            discount_offered = int(match)
            if discount_offered > max_allowed_discount:
                print(f"[WARNING] Hallucination Detected: LLM offered {discount_offered}% but {brand_name} only allows {max_allowed_discount}%!")
                return False, f"Campaign violates {brand_name} discount policy (Offered {discount_offered}%, Max {max_allowed_discount}%)."
                
        return True, "Campaign is policy compliant."

    def sanitize_image_prompt(self, raw_prompt: str, store_type: str = "sports", target_segment: str = "Gym Freak"):
        was_filtered = False
        if self.restricted_terms_regex.search(raw_prompt):
            was_filtered = True

        clean_user_prompt = self.restricted_terms_regex.sub('', raw_prompt)
        clean_user_prompt = re.sub(r'^change (the )?image (to|with)?\s*', '', clean_user_prompt, flags=re.IGNORECASE).strip()

        store_context_map = {
            "sports": "Modest commercial athletic product photoshoot, modest sportswear, athletic shoes, gym gear, fully covered modest sports apparel",
            "tech": "Modern consumer electronics commercial product display photoshoot, gaming hardware, smart devices, clean office workspace",
            "grocery": "Wholesome fresh organic groceries photoshoot, fresh fruits, vegetables, almond milk, clean food display",
            "home": "Nordic home interior decor commercial photoshoot, aesthetic furniture, indoor green plants, ambient warm lighting",
            "gen": "Clean modern retail commercial product advertisement photoshoot"
        }

        store_context = store_context_map.get(store_type, store_context_map["gen"])
        safety_directives = "modest fully covered clothing, tasteful elegant attire, family friendly commercial retail ad, non-nsfw, high quality studio lighting"

        final_prompt = f"{store_context}, {target_segment} theme, {clean_user_prompt or 'product showcase'}, {safety_directives}"
        return final_prompt, was_filtered

