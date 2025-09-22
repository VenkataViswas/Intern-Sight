import React from 'react'

const Card = () => (
  <div className="p-4 md:p-8 max-w-4xl mx-auto">
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl text-center">
      <img
        src={`https://i.pravatar.cc/150?u=a042581f4e29026704a`}
        alt="User Avatar"
        className="w-32 h-32 rounded-full mx-auto ring-4 ring-purple-500/70 p-1 shadow-lg"
      />
      <h2 className="text-3xl font-bold text-white mt-6">Alex Doe</h2>
      <p className="text-indigo-300 font-medium">Aspiring Product Manager</p>

      <div className="mt-10 border-t border-slate-700 pt-8">
        <h3 className="text-xl font-semibold text-white">
          Performance Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Overall Score", value: "88%", note: "Above average" },
            { title: "Clarity & Conciseness", value: "92%", note: "Excellent" },
            {
              title: "Technical Depth",
              value: "81%",
              note: "Needs improvement",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-700/50 hover:bg-slate-700 transition rounded-lg p-6 shadow-md hover:shadow-purple-500/30"
            >
              <h4 className="font-semibold text-purple-300">{item.title}</h4>
              <p className="text-3xl font-bold text-white mt-1">{item.value}</p>
              <p className="text-xs text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default Card
