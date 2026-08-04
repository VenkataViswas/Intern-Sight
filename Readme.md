# Intern‑Sight

Intern‑Sight is a recommendation system for internship opportunities, designed especially for youth in India (including remote, rural, or underserved backgrounds). Its goal is to help candidates find internships that match their skills, interests, experience, and location—making the process simpler, more accessible, and more effective.

---

## 🛠️ Project Structure

The repo is organized into two main directories:

Intern‑Sight/
├── backend/        # Server‑side logic (APIs, data models, recommendation engine)
├── frontend/       # UI client (React + Tailwind, etc.)
├── requirements.txt
├── .gitignore
└── ...other configs

---

## ✅ Features

- Users can provide profile inputs: **skills**, **area of interest**, **experience level**, **preferred location**.  
- The system returns **3‑5 curated internship suggestions** instead of overwhelming lists.  
- Responsive, mobile‑friendly UI for low digital literacy contexts.  
- Lightweight backend, designed to integrate with existing systems like the PM Internship Scheme portal.  
- Clean UI with consistent styling (gradients, shadows, rounded cards) for a modern look.

---

## 💻 Tech Stack

Here are the main technologies being used:

| Component     | Technology / Library |
|----------------|-----------------------|
| Backend        | Node.js / Express (or similar REST API framework) + Database (e.g. MongoDB / PostgreSQL),FastAPI, Python |
| Frontend       | React with Tailwind CSS |
| UI/UX Styles   | Glassmorphism, Gradients, Accessible color schemes |
| Version Control| Git + GitHub |

---

## 🔍 Getting Started

### Prerequisites

- Node.js (v14+ recommended)  
- Yarn or npm  
- A database (local or cloud) configured with the backend  
- Environment variables (if any, e.g. for DB connection, API keys)

### Running Locally

1. Clone the repository:

   git clone https://github.com/VenkataViswas/Intern‑Sight.git
   cd Intern‑Sight

2. Setup backend:

   cd backend
   npm install         # or yarn
   # configure environment variables, e.g. .env file
   npm run dev         # or equivalent

3. Setup frontend:

   cd ../frontend
   npm install         # or yarn
   npm run dev         # or equivalent

4. Open your browser and go to the frontend URL (often http://localhost:3000 depending on setup).

---

## 🔌 API Endpoints

Here are likely endpoints (you’ll adjust paths based on your implementation):

| Method | Endpoint                   | Description |
|--------|-----------------------------|-------------|
| POST   | `/recommendations`         | Accepts a profile input (skills, interests, experience, location) and returns recommended internships. |
| GET    | `/internships`             | List or search internships (for admin or users, optional). |
| GET    | `/profile/:userId`         | Fetch user profile (if saving / editing is supported). |

---

## ⚙️ Recommendation Logic

- Basic matching on skills / interest area: internships tagged with similar keywords get higher score.  
- Weighting experience level (if user’s experience ≥ required).  
- Location preferences get encoded (remote vs city vs state etc.).  
- Possibly filtering / ranking by relevance and then returning top 3‑5.

---

## 🎯 Design & UI Guidelines

- Use cards with rounded corners, shadows, glassmorphism effects.  
- Color scheme: slate/dark background, purple / indigo / gradient accents.  
- Buttons and inputs have high contrast and clear focus / hover states to aid usability and accessibility.  
- Responsive layout (mobile-first) so users on any device have a good experience.

---

## 🪂 Contributions

If you want to contribute:

1. Fork the repo.  
2. Create a branch (e.g. `feature/my‑feature`).  
3. Make your changes.  
4. Submit a pull request with description of what you changed.

---

## 📄 License & Contact

- License: *[your chosen open source license]* (e.g. MIT)  
- Contact: *Your name / email / project slack or Discord if you have one*

---

## 🔭 Future Enhancements

- Support multi‑skill / multi‑interest tagging UI on the frontend.  
- More refined matching using embeddings or simple ML models.  
- Save user profiles, so returning users see updated suggestions.  
- Admin panel for managing internship listings.  
- Light / dark theme toggle for better accessibility preferences.

---

Thanks for checking out Intern­Sight! Let’s make finding internships easier for all candidates.
