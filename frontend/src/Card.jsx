import React from "react";

const Card = ({ title, company, location, duration, stipend, score }) => {
  return (
    <div className="bg-slate-700/50 hover:bg-slate-700 transition rounded-lg p-6 shadow-md hover:shadow-purple-500/30">
      <h4 className="font-semibold text-purple-300">{title}</h4>
      <p className="text-white mt-1">{company}</p>
      <p className="text-sm text-indigo-300">{location}</p>
      <p className="text-slate-400 text-sm mt-2">Duration: {duration}</p>
      <p className="text-slate-400 text-sm">Stipend: {stipend}</p>
      <p className="text-sm text-indigo-300">
        Match Score: {(score * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default Card;
