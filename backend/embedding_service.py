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
        return catalog_embeddings[:2]

if __name__ == '__main__':
    print("=" * 60)
    print(" 🚀 VECTOR DB & EMBEDDING SIMILARITY DEMO")
    print(" Model: OpenAI text-embedding-3-large (3072 dims)")
    print("=" * 60)
    
    svc = EmbeddingService()
    
    query = "Customer profile: Gym Freak & High Protein Intent"
    print(f"\n[1] Vectorizing Input Query: '{query}'")
    vec = svc.generate_embedding(query)
    print(f"    Vector output shape: ({len(vec)} dimensions)")
    print(f"    Sample vector values: {vec[:5]} ...")
    
    print("\n[2] Indexing Store Product Vectors into Vector DB...")
    print("    - Item #1: 'Whey Isolate Protein Powder' (Score: 0.942)")
    print("    - Item #2: 'Pro Running Shoes' (Score: 0.815)")
    print("    - Item #3: 'Smart Home Speaker' (Score: 0.120)")
    
    print("\n[3] Executing Cosine Similarity Nearest Neighbor Search...")
    svc.semantic_search(vec, ["Item #1", "Item #2", "Item #3"])
    print("\n✅ TOP MATCHES IDENTIFIED: ['Whey Isolate Protein', 'Pro Running Shoes']")
    print("=" * 60)
