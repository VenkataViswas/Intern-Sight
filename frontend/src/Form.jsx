import React, { useState } from "react";
import axios from "axios";
import Card from "./Card";

const Form = () => {
  const [formData, setFormData] = useState({
    skills_text: "",
    area_of_interest: "",
    preferred_locations: "",
  });

  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // ✅ API URL from .env (must start with VITE_)
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/recommendations`, {
        skills_text: formData.skills_text,
        area_of_interest: formData.area_of_interest,
        preferred_locations: formData.preferred_locations
          .split(",")
          .map((loc) => loc.trim()),
      });
      setInternships(res.data || []);
      setCurrentPage(0);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Pagination
  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const currentData = internships.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">
          Internship Recommendation
        </h2>
        <p className="text-slate-400 mb-8">
          Fill in your profile details to get personalized internship
          suggestions.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Skills */}
          <div>
            <label
              htmlFor="skills_text"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills_text"
              placeholder="e.g., JavaScript, Python, Data Analysis"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={formData.skills_text}
              onChange={handleChange}
            />
          </div>

          {/* Area of Interest */}
          <div>
            <label
              htmlFor="area_of_interest"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Area of Interest
            </label>
            <input
              type="text"
              id="area_of_interest"
              placeholder="e.g., Web Development, AI/ML, Product Management"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={formData.area_of_interest}
              onChange={handleChange}
            />
          </div>

          {/* Location Preference */}
          <div>
            <label
              htmlFor="preferred_locations"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Preferred Locations
            </label>
            <input
              type="text"
              id="preferred_locations"
              placeholder="e.g., Mumbai, Bangalore, Remote"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={formData.preferred_locations}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Get Recommendations
          </button>
        </form>

        {/* Results */}
        <div className="mt-10">
          {internships.length === 0 ? (
            <p className="text-center text-slate-400">No Data Found</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentData.map((item, i) => (
                  <Card
                    key={i}
                    title={item.title}
                    company={item.company}
                    location={item.location}
                    duration={item.duration}
                    stipend={item.stipend}
                    score={item.score}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-40 hover:bg-purple-600 transition"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      (p + 1) * itemsPerPage < internships.length ? p + 1 : p
                    )
                  }
                  disabled={
                    (currentPage + 1) * itemsPerPage >= internships.length
                  }
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-40 hover:bg-purple-600 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
