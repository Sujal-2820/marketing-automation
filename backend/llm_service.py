import time
from typing import Dict, Any

class DeepSeekLLMService:
    def __init__(self, api_key: str = "sk-dummy-deepseek-v3-key"):
        self.model = "deepseek-v3"
        self.temperature = 0.7
        self.max_tokens = 500
        print(f"[DeepSeek Service] Initialized LLM API connection with model: {self.model}")

    def generate_ad_copy(self, segment: str, brand_context: Dict[str, Any], language: str = "Hinglish") -> Dict[str, str]:
        print(f"[DeepSeek Service] Generating ad copy for '{segment}' segment in {language} language...")
        
        # Simulate network API latency
        time.sleep(0.6)
        
        brand_name = brand_context.get('brand', 'Store')
        
        # Language-specific Copy Generation Matrix
        copy_matrix = {
            "Hinglish": {
                "title": f"{segment} Ho? Bhaag ke aao!",
                "subtitle": f"{brand_name} pe naya stock aagaya hai. Special member discount active!",
                "cta": "Shop Now",
                "smsCopy": f"Bhai {segment} special deal active hai! Special discount on {brand_name}. Check it out: store.link/deal"
            },
            "Hindi": {
                "title": f"{segment} के लिए खास ऑफर!",
                "subtitle": f"{brand_name} पर नया स्टॉक आ गया है। विशेष छूट का लाभ उठाएं!",
                "cta": "अभी खरीदें",
                "smsCopy": f"नमस्ते! {segment} के लिए {brand_name} पर विशेष डिस्काउंट लाइव है: store.link/deal"
            },
            "English": {
                "title": f"Unleash Your Inner {segment}",
                "subtitle": f"New arrivals available at {brand_name}. Flat discount today only!",
                "cta": "Shop Collection",
                "smsCopy": f"Exclusive {segment} offer at {brand_name}! Limited time discount live. Order now: store.link/deal"
            }
        }
        
        return copy_matrix.get(language, copy_matrix["Hinglish"])

