import random

class MLEngine:
    def __init__(self):
        print("Initializing Dummy ML Behavioral Engine...")

    def extract_features(self, purchase_history, privacy_consent):
        if not privacy_consent.get('purchase_history', False):
            return "generic"
        
        # Dummy feature extraction based on basket diversity
        categories = set(purchase_history)
        shannon_entropy = len(categories) * 1.5 # Dummy entropy score
        return shannon_entropy

    def classify_segment(self, features):
        if features == "generic":
            return ["Generic Shopper"]
            
        # Dummy Cosine Similarity against known segments
        segments = ["Gym Freak", "Health Conscious", "Snack Lover", "Gamer", "Decor"]
        return random.sample(segments, k=min(2, int(features)))
