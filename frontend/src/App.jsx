import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Home, ClipboardList } from "lucide-react";
import Body from "./Body.jsx";
import Form from "./Form.jsx";
import Card from "./Card.jsx";

// --- Custom NavLink for Active Styling ---
const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
          : "text-slate-300 hover:text-white hover:bg-slate-800/70"
      }`}
    >
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  );
};

// --- Why Choose InternSight Section ---

const WhyChoose = () => (
  <section className="max-w-5xl mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-white text-center mb-12">
      Why Choose InternSight?
    </h2>
    <div className="grid md:grid-cols-2 gap-8 text-white">
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          AI-Powered Personaliza  tion
        </h3>
        <p>
          InternSight employs advanced AI algorithms to analyze your profile,
          academic background, interests, and location preferences, delivering
          3-5 curated internship suggestions that align with your aspirations.
        </p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          User-Friendly Interface
        </h3>
        <p>
          Designed with simplicity in mind, the platform ensures accessibility
          for users with limited digital literacy, offering a seamless
          experience on both mobile and desktop devices.
        </p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          Localized Opportunities
        </h3>
        <p>
          InternSight focuses on opportunities within India, connecting students
          to internships that are geographically relevant and culturally
          appropriate.
        </p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          Integration with PM Internship Scheme
        </h3>
        <p>
          The platform is designed to integrate effortlessly with the existing
          PM Internship Scheme portal, enhancing its functionality without the
          need for complex deployments.
        </p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 md:col-span-2">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          Empowering First-Generation Learners
        </h3>
        <p>
          By providing tailored recommendations, InternSight helps
          first-generation learners identify and apply for internships that
          match their skills and interests, bridging the gap to meaningful
          career opportunities.
        </p>
      </div>
    </div>
  </section>
);

// --- Main App ---
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200 font-sans relative">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Intern Sight
                </h1>
              </Link>
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/" icon={Home}>
                  Home
                </NavLink>
                <NavLink to="/predict" icon={ClipboardList}>
                  Internship Recommendation
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        

        {/* Routes */}
        <main className="flex-1 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:18px_18px] opacity-60"></div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Body />
                  <WhyChoose />
                </>
              }
            />
            <Route path="/predict" element={<Form />} />
            <Route path="/result" element={<Card />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800/60 border-t border-slate-700/50 mt-10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  Intern Sight
                </h2>
                <p className="text-slate-400">
                  Empowering students to ace their interviews.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="font-semibold text-white">Quick Links</h2>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link to="/" className="hover:text-purple-300 transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-purple-300 transition">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-purple-300 transition">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-semibold text-white">Resources</h2>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <Link
                      to="/predict"
                      className="hover:text-purple-300 transition"
                    >
                      Practice Interview
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-10 pt-8 border-t border-slate-700">
              © {new Date().getFullYear()} InternSight. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
