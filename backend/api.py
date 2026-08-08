from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

try:
    from backend.ml_engine import MLEngine
    from backend.llm_service import DeepSeekLLMService
    from backend.embedding_service import EmbeddingService
    from backend.guardrails import GuardrailEngine
except ImportError:
    from ml_engine import MLEngine
    from llm_service import DeepSeekLLMService
    from embedding_service import EmbeddingService
    from guardrails import GuardrailEngine

app = FastAPI(title="Marketing Automation Backend API")

ml = MLEngine()
llm = DeepSeekLLMService()
embedder = EmbeddingService()
guardrail = GuardrailEngine()

class CustomerData(BaseModel):
    purchase_history: List[str]
    consent: Dict[str, bool]

class BrandContext(BaseModel):
    name: str
    max_discount: int

@app.post("/api/v1/generate_campaign")
def generate_campaign(customer: CustomerData, brand: BrandContext):
    # 1. Extract Behavioral Features
    features = ml.extract_features(customer.purchase_history, customer.consent)
    segments = ml.classify_segment(features)
    
    if not segments:
        raise HTTPException(status_code=400, detail="Failed to segment customer")
        
    primary_segment = segments[0]
    
    # 2. Generate Context Embeddings
    context_vector = embedder.generate_embedding(primary_segment)
    
    # 3. Call DeepSeek LLM for Copy Generation
    raw_campaign = llm.generate_ad_copy(primary_segment, {"brand": brand.name})
    
    # 4. Guardrail Validation Engine
    is_valid, msg = guardrail.validate_campaign(
        campaign_text=raw_campaign["smsCopy"], 
        max_allowed_discount=brand.max_discount, 
        brand_name=brand.name
    )
    
    if not is_valid:
        # Auto-correction / fallback could happen here
        return {"status": "blocked_by_guardrail", "reason": msg, "original_generation": raw_campaign}
        
    return {
        "status": "success",
        "segments_identified": segments,
        "campaign": raw_campaign
    }

# Run with: uvicorn api:app --reload
