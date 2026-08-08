import math
import random
from typing import List, Dict, Any

class MLEngine:
    def __init__(self):
        print("Initializing Enterprise ML Behavioral Analysis & Clustering Engine...")
        self.category_keywords = {
            "Gym Freak": ["nike", "adidas", "shoes", "runners", "whey", "protein", "gym", "activewear"],
            "Gamer": ["gpu", "rtx", "headphones", "sonic", "keyboard", "pc", "gaming", "monitor"],
            "Health Conscious": ["almond", "milk", "oats", "organic", "vegan", "quinoa", "olive oil"],
            "Decor": ["lamp", "furniture", "plant", "monstera", "decor", "chair", "pillow"]
        }

    def extract_features(self, purchase_history: List[str], privacy_consent: Dict[str, bool]) -> Dict[str, Any]:
        if not privacy_consent.get('purchase_history', True):
            print("[ML Engine] Purchase History consent revoked by Privacy Vault. Returning generic vector.")
            return {"v_entropy": 0.0, "is_generic": True}
        
        # Calculate category density frequencies
        text_corpus = " ".join(purchase_history).lower()
        counts = {cat: 0 for cat in self.category_keywords}
        
        for cat, keywords in self.category_keywords.items():
            for kw in keywords:
                if kw in text_corpus:
                    counts[cat] += 1

        total = sum(counts.values()) or 1
        
        # Calculate Shannon Information Entropy (Cross-Category Diversity)
        entropy = 0.0
        for count in counts.values():
            if count > 0:
                p = count / total
                entropy -= p * math.log2(p)

        return {
            "counts": counts,
            "total_items": len(purchase_history),
            "v_entropy": round(entropy, 3),
            "is_generic": False
        }

    def classify_segment(self, features: Dict[str, Any]) -> List[str]:
        if features.get("is_generic"):
            return ["Generic Shopper"]
            
        counts = features.get("counts", {})
        sorted_segments = sorted(counts.items(), key=lambda x: x[1], reverse=True)
        
        predicted = [seg for seg, count in sorted_segments if count > 0]
        if not predicted:
            predicted = ["Gym Freak", "Health Conscious"]

        return predicted[:2]

