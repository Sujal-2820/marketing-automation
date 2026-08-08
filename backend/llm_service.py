import time

class DeepSeekLLMService:
    def __init__(self, api_key="sk-dummy-deepseek-v3-key"):
        self.model = "deepseek-v3"
        print(f"Connected to DeepSeek API using model: {self.model}")

    def generate_ad_copy(self, segment, brand_context, language="Hinglish"):
        print(f"Calling {self.model} for segment: {segment} in {language}...")
        
        # Simulate network latency
        time.sleep(1.2)
        
        # Dummy generated campaign
        return {
            "title": f"Ultimate Sale for {segment}",
            "subtitle": f"Level up your game with our new arrivals. Up to 50% off!",
            "cta": "Shop Now",
            "smsCopy": f"Bhai, {segment} special deal active hai! 50% off on {brand_context.get('brand', 'all items')}. Check it out: store.link/deal"
        }
