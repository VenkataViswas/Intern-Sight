import os
import joblib
import numpy as np
import pandas as pd
import scipy.sparse
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# --- Load Environment Variables ---
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
MODEL_TFIDF = os.getenv("MODEL_TFIDF", "tfidf_vectorizer.pkl")
MODEL_TFIDF_VECTORS = os.getenv("MODEL_TFIDF_VECTORS", "internship_tfidf_vectors.npz")
MODEL_EMBEDDINGS = os.getenv("MODEL_EMBEDDINGS", "internship_embeddings.npy")
INTERNSHIPS_CSV = os.getenv("INTERNSHIPS_CSV", "internships.csv")

# --- Pydantic Models ---
class CandidateProfile(BaseModel):
    skills_text: str
    area_of_interest: str
    preferred_locations: List[str]

class Recommendation(BaseModel):
    internship_id: int
    title: str
    company: str
    location: str
    duration: str
    stipend: str
    score: float

# --- Global Variables ---
TFIDF_VECTORIZER = None
SENTENCE_MODEL = None
INTERNSHIP_TFIDF_VECTORS = None
INTERNSHIP_EMBEDDINGS = None
INTERNSHIP_TITLE_EMBEDDINGS = None
INTERNSHIPS_DF = None

# --- Static Data ---
AVAILABLE_LOCATIONS = [ "Bangalore", "Chennai", "Delhi", "Hyderabad", "Mumbai", 
                       "Pune", "Visakhapatnam", "Remote", "Work From Home" ]

AREAS_OF_INTEREST = [ "Web Development", "Backend Development", "Frontend Development", 
                      "Mobile App", "Machine Learning", "Data Science", "AI", 
                      "DevOps", "Testing", "Software Engineering" ]

# --- Lifespan Manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global TFIDF_VECTORIZER, SENTENCE_MODEL, INTERNSHIP_TFIDF_VECTORS, INTERNSHIP_EMBEDDINGS, INTERNSHIP_TITLE_EMBEDDINGS, INTERNSHIPS_DF
    
    print("🔄 Loading model artifacts...")
    TFIDF_VECTORIZER = joblib.load(MODEL_TFIDF)
    INTERNSHIP_TFIDF_VECTORS = scipy.sparse.load_npz(MODEL_TFIDF_VECTORS)
    INTERNSHIP_EMBEDDINGS = np.load(MODEL_EMBEDDINGS)
    SENTENCE_MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    INTERNSHIPS_DF = pd.read_csv(INTERNSHIPS_CSV).fillna("")
    INTERNSHIP_TITLE_EMBEDDINGS = SENTENCE_MODEL.encode(INTERNSHIPS_DF["internship"].tolist())
    print("✅ Artifacts loaded successfully.")
    yield
    print("🛑 Shutting down.")

# --- FastAPI App ---
app = FastAPI(lifespan=lifespan, title="Internship Recommendation API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --- API Endpoints ---
@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/locations", response_model=List[str])
def get_locations():
    return AVAILABLE_LOCATIONS

@app.get("/interests", response_model=List[str])
def get_interests():
    return AREAS_OF_INTEREST

@app.post("/recommendations", response_model=List[Recommendation])
def get_recommendations(candidate: CandidateProfile):
    # --- Skills Score ---
    candidate_skills_tfidf = TFIDF_VECTORIZER.transform([candidate.skills_text])
    candidate_skills_embedding = SENTENCE_MODEL.encode([candidate.skills_text])
    s_tfidf = cosine_similarity(candidate_skills_tfidf, INTERNSHIP_TFIDF_VECTORS)[0]
    s_sem = cosine_similarity(candidate_skills_embedding, INTERNSHIP_EMBEDDINGS)[0]
    s_skills = (0.5 * s_tfidf) + (0.5 * s_sem)

    # --- Area of Interest Score ---
    candidate_interest_embedding = SENTENCE_MODEL.encode([candidate.area_of_interest])
    s_interest = cosine_similarity(candidate_interest_embedding, INTERNSHIP_TITLE_EMBEDDINGS)[0]

    # --- Location Score ---
    candidate_locations_set = set([loc.lower().strip() for loc in candidate.preferred_locations])

    def calculate_location_score(internship_loc):
        internship_loc_lower = str(internship_loc).lower()
        if any(pref_loc in internship_loc_lower for pref_loc in candidate_locations_set if pref_loc not in ["remote", "work from home"]):
            return 1.0
        is_internship_remote = "work from home" in internship_loc_lower or "remote" in internship_loc_lower
        is_candidate_open_to_remote = "remote" in candidate_locations_set or "work from home" in candidate_locations_set
        if is_internship_remote and is_candidate_open_to_remote:
            return 0.8
        return 0.1

    s_location = INTERNSHIPS_DF["location"].apply(calculate_location_score).to_numpy()

    # --- Final Weighted Score ---
    final_score = (0.60 * s_skills) + (0.25 * s_interest) + (0.15 * s_location)

    # --- Top 5 Recommendations ---
    top_5_indices = final_score.argsort()[-5:][::-1]
    recommendations = []
    for index in top_5_indices:
        internship_data = INTERNSHIPS_DF.iloc[index]
        recommendations.append(
            Recommendation(
                internship_id=int(internship_data.get("id", -1)),
                title=internship_data.get("internship", ""),
                company=internship_data.get("company_name", ""),
                location=internship_data.get("location", ""),
                duration=internship_data.get("duration", ""),
                stipend=internship_data.get("stipend", ""),
                score=float(final_score[index])
            )
        )
    return recommendations


# --- Main Entrypoint ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("RELOAD", "false").lower() == "true"
    )
