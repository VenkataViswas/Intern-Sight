import React from "react";

const Form = () => (
  <div className="p-4 md:p-8 max-w-4xl mx-auto">
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">
        Internship Recommendation
      </h2>
      <p className="text-slate-400 mb-8">
        Fill in your profile details to get personalized internship suggestions.
      </p>
      <form className="space-y-6">
        {/* Skills */}
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Skills
          </label>
          <input
            type="text"
            id="skills"
            placeholder="e.g., JavaScript, Python, Data Analysis"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Area of Interest */}
        <div>
          <label
            htmlFor="interest"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Area of Interest
          </label>
          <input
            type="text"
            id="interest"
            placeholder="e.g., Web Development, AI/ML, Product Management"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Experience Level
          </label>
          <select
            id="experience"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
          >
            <option>Fresher / No Experience</option>
            <option>1-2 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </select>
        </div>

        {/* Location Preference */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Preferred Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="e.g., Mumbai, Bangalore, Remote"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Get Recommendations
        </button>
      </form>
    </div>
  </div>
);

export default Form;
