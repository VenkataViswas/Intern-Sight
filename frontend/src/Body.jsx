import React from "react";
import { Link } from "react-router-dom";

const Body = () => (
  <div className="text-center p-8 md:p-16 relative">
    {/* Glow effect */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-900/40"></div>

    <div className="relative inline-block">
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-70 animate-pulse"></div>
      <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
        Intern Sight
      </h1>
    </div>

    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed">
      Find the internships that best match your skills, interests, and
      aspirations with AI-powered personalized recommendations
      <span className="block mt-1 font-semibold text-indigo-300">
        Turn potential into success.
      </span>
    </p>

    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
      <Link
        to="/predict"
        className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
      >
        Start Getting Best Internships Recommendation
      </Link>
      
    </div>
  </div>
);

export default Body;
