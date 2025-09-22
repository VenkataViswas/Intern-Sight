from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import scipy.sparse

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

# --- Global Variables with Your Data---
TFIDF_VECTORIZER = None
SENTENCE_MODEL = None
INTERNSHIP_TFIDF_VECTORS = None
INTERNSHIP_EMBEDDINGS = None
INTERNSHIP_TITLE_EMBEDDINGS = None
INTERNSHIPS_DF = None
AVAILABLE_LOCATIONS = ['Adambakkam', 'Adilabad', 'Agra', 'Ahmedabad', 'Aizawl', 'Ajmer', 'Akurdi', 'Alwar', 'Amaravati', 'Ambala', 'Ambala Cantt', 'Ameerpet', 'Amravati', 'Amritsar', 'Auraiya', 'Aurangabad', 'Balasore', 'Bangalore', 'Baran', 'Begusarai', 'Belgaum', 'Bhagalpur', 'Bhavnagar', 'Bhilai', 'Bhilwara', 'Bhiwandi', 'Bhopal', 'Bhubaneswar', 'Bikaner', 'Bilimora', 'Bokaro Steel City', 'Chandigarh', 'Chengalpattu', 'Chennai', 'Cochin', 'Coimbatore', 'Coimbatore North', 'Cuttack', 'Dehradun', 'Delhi', 'Dewa', 'Dharamshala', 'Dharwad', 'Dholpur', 'Dibiyapur', 'Dindigul', 'Durg', 'East Godavari', 'Erode', 'Erragadda', 'Faridabad', 'Gandhinagar', 'Ghaziabad', 'Goa Velha', 'Goregaon Kh', 'Greater Noida', 'Guntur', 'Gurgaon', 'Gwalior', 'Gwalior West', 'Haridwar', 'Haryana', 'Hubli', 'Hyderabad', 'Indore', 'Itanagar', 'Jabalpur', 'Jaipur', 'Jalandhar', 'Jalna', 'Jammu', 'Jamshedpur', 'Jangaon', 'Jhalawar', 'Jhansi', 'Junagadh', 'Kadiri', 'Kakinada', 'Kallakurichi', 'Kalyan', 'Kanchipuram', 'Kanker', 'Kannur', 'Kanpur', 'Kanyakumari', 'Karimnagar', 'Karnal', 'Karur', 'Kasol', 'Keonjhar', 'Khammam', 'Kharar', 'Khurdha', 'Kochi', 'Kodambakkam', 'Kolkata', 'Kota', 'Krishnagiri', 'Kumbakonam', 'Kurnool', 'Lucknow', 'Ludhiana', 'Madhapur', 'Madipakkam', 'Madurai', 'Maharashtra', 'Mahbubnagar', 'Malegaon', 'Manali', 'Mandya', 'Margao', 'Mayiladuthurai', 'Medak', 'Meerut', 'Mehsana', 'Mira Bhayandar', 'Miyapur', 'Modinagar', 'Mohali', 'Mumbai', 'Mysuru', 'Nagapattinam', 'Nagercoil', 'Nagpur', 'Nainital', 'Namakkal', 'Narasaraopeta', 'Narsapur', 'Nashik', 'Navallur', 'Navi Mumbai', 'Noida', 'Odisha', 'Ooty', 'Palitana', 'Pallavaram', 'Panchkula', 'Panjim', 'Patna', 'Perambalur', 'Perungudi', 'Pimpri-Chinchwad', 'Pitampura', 'Pollachi', 'Puducherry', 'Pudukottai', 'Pune', 'Punewadi', 'Punjab Small Industries Corporation (Pakistan)', 'Puri', 'Purnea', 'Raipur', 'Rajahmundry', 'Rajarhat', 'Rajkot', 'Rajpura', 'Rajsamand', 'Ramanathapuram', 'Ranchi', 'Rohtak', 'Sagar', 'Salem', 'Secunderabad', 'Shahpur', 'Shimla', 'Sikar', 'Sirsa', 'Sivaganga', 'Sivakasi', 'Solan', 'Sonepat', 'Srikakulam', 'Surajpur', 'Surat', 'Surendranagar', 'Tambaram Sanatorium', 'Tapi', 'Thane', 'Thanjavur', 'Theni', 'Thiruvallur', 'Thiruvananthapuram', 'Tirchy', 'Tiruchirappalli', 'Tirunelveli', 'Tirupati', 'Udaipur', 'Ujjain', 'Ulhasnagar', 'Una', 'Vadodara', 'Vadodra', 'Varanasi', 'Vasai-Virar', 'Vijayawada', 'Viluppuram', 'Virudhunagar', 'Visakhapatnam', 'Vyara', 'Wakad', 'Warangal', 'West Medinipur', 'Work From Home', 'Zirakpur']
AREAS_OF_INTEREST = ['Android', 'App', 'App Development', 'Backend', 'Backend Development', 'Development', 'End', 'End Development', 'Engineering', 'Management', 'Mobile', 'Mobile App', 'Nodejs', 'Php', 'Php Development', 'Python', 'Software', 'Software Development', 'Stack', 'Stack Development', 'Testing', 'Web', 'Web Development', 'Wordpress', 'Wordpress Development']

# --- Lifespan Manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global TFIDF_VECTORIZER, SENTENCE_MODEL, INTERNSHIP_TFIDF_VECTORS, INTERNSHIP_EMBEDDINGS, INTERNSHIP_TITLE_EMBEDDINGS, INTERNSHIPS_DF
    print("Loading model artifacts...")
    TFIDF_VECTORIZER = joblib.load('tfidf_vectorizer.pkl')
    INTERNSHIP_TFIDF_VECTORS = scipy.sparse.load_npz('internship_tfidf_vectors.npz')
    INTERNSHIP_EMBEDDINGS = np.load('internship_embeddings.npy')
    SENTENCE_MODEL = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    INTERNSHIPS_DF = pd.read_csv('internships.csv').fillna('')
    INTERNSHIP_TITLE_EMBEDDINGS = SENTENCE_MODEL.encode(INTERNSHIPS_DF['internship'].tolist())
    print("Artifacts loaded successfully.")
    yield
    print("Shutting down.")

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# --- API Endpoints ---
@app.get("/locations", response_model=List[str])
def get_locations():
    return AVAILABLE_LOCATIONS

@app.get("/interests", response_model=List[str])
def get_interests():
    return AREAS_OF_INTEREST

# In your api.py file, replace the old get_recommendations function with this one.

@app.post("/recommendations", response_model=List[Recommendation])
def get_recommendations(candidate: CandidateProfile):
    # --- 1. SKILLS SCORE ---
    candidate_skills_tfidf = TFIDF_VECTORIZER.transform([candidate.skills_text])
    candidate_skills_embedding = SENTENCE_MODEL.encode([candidate.skills_text])
    s_tfidf = cosine_similarity(candidate_skills_tfidf, INTERNSHIP_TFIDF_VECTORS)[0]
    s_sem = cosine_similarity(candidate_skills_embedding, INTERNSHIP_EMBEDDINGS)[0]
    s_skills = (0.5 * s_tfidf) + (0.5 * s_sem)

    # --- 2. AREA OF INTEREST SCORE ---
    candidate_interest_embedding = SENTENCE_MODEL.encode([candidate.area_of_interest])
    s_interest = cosine_similarity(candidate_interest_embedding, INTERNSHIP_TITLE_EMBEDDINGS)[0]

    # --- 3. LOCATION SCORE (NEW LOGIC) ---
    candidate_locations_set = set([loc.lower().strip() for loc in candidate.preferred_locations])

    def calculate_location_score(internship_loc):
        internship_loc_lower = str(internship_loc).lower()
        
        # Tier 1: Direct match with one of the preferred locations
        if any(pref_loc in internship_loc_lower for pref_loc in candidate_locations_set if pref_loc not in ["remote", "work from home"]):
            return 1.0
        
        # Tier 2: Internship is remote and candidate is open to it
        is_internship_remote = "work from home" in internship_loc_lower or "remote" in internship_loc_lower
        is_candidate_open_to_remote = "remote" in candidate_locations_set or "work from home" in candidate_locations_set
        if is_internship_remote and is_candidate_open_to_remote:
            return 0.8
            
        # Tier 3: No match, give a fixed lower score
        return 0.1

    s_location = INTERNSHIPS_DF['location'].apply(calculate_location_score).to_numpy()

    # --- 4. FINAL WEIGHTED SCORE ---
    final_score = (0.60 * s_skills) + (0.25 * s_interest) + (0.15 * s_location)
    
    # --- 5. GET TOP 5 AND FORMAT RESPONSE ---
    top_5_indices = final_score.argsort()[-5:][::-1]
    
    recommendations = []
    for index in top_5_indices:
        internship_data = INTERNSHIPS_DF.iloc[index]
        recommendations.append(
            Recommendation(
                internship_id=int(internship_data.get('id', -1)),
                title=internship_data.get('internship', ''),
                company=internship_data.get('company_name', ''),
                location=internship_data.get('location', ''),
                duration=internship_data.get('duration', ''),
                stipend=internship_data.get('stipend', ''),
                score=float(final_score[index])
            )
        )
    return recommendations