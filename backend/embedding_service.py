import time

class EmbeddingService:
    def __init__(self, api_key="sk-proj-dummy-openai-key"):
        self.model = "text-embedding-3-large"
        print(f"Initialized Embedding Service with model: {self.model}")

    def generate_embedding(self, text):
        # Simulate network delay for API call
        time.sleep(0.5)
        print(f"Generating 3072-dimensional embedding for: '{text[:30]}...'")
        
        # Return a dummy vector
        return [0.012, -0.045, 0.882, 0.111, -0.005] * 614 # Approximating 3072 dims

    def semantic_search(self, target_embedding, catalog_embeddings):
        print("Performing vector similarity search (Cosine Similarity)...")
        # Dummy search logic
        return catalog_embeddings[:2]
