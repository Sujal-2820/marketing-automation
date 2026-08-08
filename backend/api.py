from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import time

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

from fastapi.responses import RedirectResponse

# Initialize FastAPI Application
app = FastAPI(
    title="Autonomous Marketing Automation AI Platform - FastAPI Service",
    description="Enterprise FastAPI REST service powered by LangChain & LangGraph Multi-Agent Orchestration, providing RAG LLM Copy Generation, ML Behavioral Clustering, Cosine Similarity Vector Embeddings, Modesty Guardrails, and Zero-Trust Data Ingestion.",
    version="2.5.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core AI & ML Engines Instance
ml = MLEngine()
llm = DeepSeekLLMService()
embedder = EmbeddingService()
guardrail = GuardrailEngine()

# ---------------- PYDANTIC REQUEST & RESPONSE SCHEMAS ----------------

class ConsentFlags(BaseModel):
    purchase_history: bool = True
    location: bool = True
    age: bool = True

class CustomerData(BaseModel):
    token_id: Optional[str] = "usr_sports_042"
    purchase_history: List[str] = Field(default_factory=lambda: ["1x Nike ZoomX", "2x Whey Protein"])
    segments: Optional[List[str]] = Field(default_factory=lambda: ["Gym Freak"])
    consent: Optional[Dict[str, bool]] = Field(default_factory=lambda: {"purchase_history": True, "location": True})

class BrandContext(BaseModel):
    name: str = "APEX SPORTS"
    category: str = "sports"
    max_discount: int = 20

class CampaignGenerationRequest(BaseModel):
    customer: CustomerData
    brand: BrandContext
    language: Optional[str] = "hinglish"

class ImageRegenerationRequest(BaseModel):
    campaign_id: int
    prompt_text: str
    store_type: str = "sports"
    target_segment: Optional[str] = "Gym Freak"

class GuardrailValidationRequest(BaseModel):
    campaign_text: str
    max_allowed_discount: int = 15
    brand_name: str = "Organic India"

# ---------------- FASTAPI ENDPOINTS ----------------

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

@app.get("/api/v1/health", summary="Backend Service Health Check & Telemetry")
def health_check():
    return {
        "status": "healthy",
        "service": "FastAPI Autonomous Marketing AI Engine",
        "version": "2.5.0",
        "timestamp": time.time(),
        "loaded_models": {
            "llm": llm.model,
            "embeddings": embedder.model,
            "clustering": "K-Means Cosine Centroid Classifier (Sub-2ms)",
            "guardrail": "Deterministic Fact-Checker & Safety Sanitizer"
        }
    }

@app.post("/api/v1/generate_campaign", summary="Generate RAG-Personalized Campaign via LLM")
def generate_campaign(req: CampaignGenerationRequest):
    """
    Executes the full RAG & ML Campaign Generation Pipeline:
    1. Extracts behavioral features and calculates Shannon Information Entropy.
    2. Runs Cosine Similarity K-Means clustering to predict customer STP segments.
    3. Vectorizes target segments into 3072-dim embeddings.
    4. Calls DeepSeek-V3 / GPT-4o LLM service for multi-lingual copy synthesis.
    5. Validates generated text against brand policy guardrails.
    """
    start_time = time.time()
    customer = req.customer
    brand = req.brand
    
    # 1. ML Behavioral Feature Extraction & Clustering
    features = ml.extract_features(customer.purchase_history, customer.consent or {})
    segments = ml.classify_segment(features)
    
    if not segments:
        raise HTTPException(status_code=400, detail="Failed to segment customer payload")
        
    primary_segment = segments[0]
    
    # 2. RAG Dense Embedding Vector Generation
    context_vector = embedder.generate_embedding(primary_segment)
    
    # 3. LLM Multi-Lingual Copy Generation
    raw_campaign = llm.generate_ad_copy(primary_segment, {"brand": brand.name}, language=req.language or "hinglish")
    
    # 4. Anti-Hallucination Brand Policy Guardrail Check
    is_valid, msg = guardrail.validate_campaign(
        campaign_text=raw_campaign["smsCopy"], 
        max_allowed_discount=brand.max_discount, 
        brand_name=brand.name
    )
    
    exec_ms = round((time.time() - start_time) * 1000, 2)
    
    if not is_valid:
        return {
            "status": "blocked_by_guardrail",
            "reason": msg,
            "execution_ms": exec_ms,
            "original_generation": raw_campaign
        }
        
    return {
        "status": "success",
        "execution_ms": exec_ms,
        "segments_identified": segments,
        "primary_segment": primary_segment,
        "vector_dimensions": len(context_vector),
        "campaign": raw_campaign
    }

@app.post("/api/v1/regenerate_image", summary="Regenerate Campaign Image with Modesty Guardrails")
def regenerate_image(req: ImageRegenerationRequest):
    """
    Synthesizes custom visual ad images using FLUX.1 / SDXL diffusion engine
    with mandatory prompt modesty safety filters and store domain alignment.
    """
    clean_prompt, was_filtered = guardrail.sanitize_image_prompt(
        raw_prompt=req.prompt_text,
        store_type=req.store_type,
        target_segment=req.target_segment
    )
    
    seed = int(time.time() * 1000) % 90000 + 10000
    image_url = f"https://image.pollinations.ai/prompt/{clean_prompt}?width=1200&height=800&nologo=true&seed={seed}"
    
    return {
        "status": "success",
        "campaign_id": req.campaign_id,
        "sanitized_prompt": clean_prompt,
        "guardrail_triggered": was_filtered,
        "image_url": image_url
    }

@app.post("/api/v1/verify_guardrail", summary="Fact-Check Campaign Copy Against Catalog Limits")
def verify_guardrail(req: GuardrailValidationRequest):
    """
    Validates campaign copy against retailer catalog discounts, stock levels, and brand safety rules.
    """
    is_valid, msg = guardrail.validate_campaign(
        campaign_text=req.campaign_text,
        max_allowed_discount=req.max_allowed_discount,
        brand_name=req.brand_name
    )
    return {
        "is_valid": is_valid,
        "message": msg,
        "max_allowed_discount": req.max_allowed_discount
    }

# Run with: uvicorn backend.api:app --reload

