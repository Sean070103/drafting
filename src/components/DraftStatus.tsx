import React from 'react';

interface DraftStatusProps {
  timer: number;
  phase: string;
  matchInfo: string;
}

export const DraftStatus: React.FC<DraftStatusProps> = ({ timer, phase, matchInfo }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-lg mx-2">
      <div className="font-bold text-lg text-white mb-1">{matchInfo}</div>
      <div className="text-2xl font-mono text-white mb-1">{timer}</div>
      <div className="text-sm font-semibold text-gray-100 uppercase tracking-widest">{phase}</div>
    </div>
  );
};

export default DraftStatus; 