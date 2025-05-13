import React from 'react';

interface DraftOverlayProps {
  matchScore: string;
  phase: string;
  timer: number;
  logo: string;
  details: string;
}

const DraftOverlay: React.FC<DraftOverlayProps> = ({ matchScore, phase, timer, logo, details }) => {
  return (
    <div className="w-full bg-black border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Match Info */}
          <div className="flex items-center space-x-8">
            <img src={logo} alt="Tournament Logo" className="h-16 w-16 object-contain" />
            <div className="text-white">
              <div className="text-2xl font-bold tracking-wider">{matchScore}</div>
              <div className="text-sm text-gray-400 whitespace-pre-line">{details}</div>
            </div>
          </div>

          {/* Center Section - Phase */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white tracking-wider mb-2">{phase}</div>
            <div className="text-5xl font-mono text-white bg-black/50 px-8 py-2 rounded-lg border border-white/20">
              {timer}
            </div>
          </div>

          {/* Right Section - Timer */}
          <div className="w-32">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000"
                style={{ width: `${(timer / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftOverlay; 