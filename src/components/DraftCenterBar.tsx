import React from 'react';

interface DraftCenterBarProps {
  matchScore: string;
  phase: string;
  timer: number;
  logo: string;
  details: string;
}

const DraftCenterBar: React.FC<DraftCenterBarProps> = ({ matchScore, phase, timer, logo, details }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[20%] py-4 bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-xl">
      <img src={logo} className="w-16 h-16 mb-2" alt="Tournament Logo" />
      <div className="text-2xl font-extrabold text-white tracking-widest mb-1">{matchScore}</div>
      <div className="text-lg text-white font-bold mb-1 uppercase">{phase}</div>
      <div className="text-4xl font-mono text-white bg-black/70 px-6 py-2 rounded-lg shadow mb-2">{timer}</div>
      <div className="text-md text-gray-100 uppercase text-center whitespace-pre-line">{details}</div>
    </div>
  );
};

export default DraftCenterBar; 