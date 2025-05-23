import React from 'react';
import { Team, DraftState } from '@/types/hero';
import Image from 'next/image';

interface CoachInfo {
  name: string;
  avatarUrl: string;
}

interface TeamPanelProps {
  team: Team;
  draftState: DraftState;
  coach: CoachInfo;
  players: string[];
  overlays?: (string | null)[]; // e.g. ['+BUFFED', null, '+NERFED', ...]
  vertical?: boolean;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({ team, draftState, coach, players, overlays, vertical }) => {
  const picks = draftState[team].picks;
  const bans = draftState[team].bans;

  return (
    <div className={`flex flex-col items-center ${vertical ? 'w-full' : 'w-1/3'} p-4 ${team === 'Blue' ? 'bg-black' : 'bg-gray-900'} rounded-lg`}>
      {/* Coach Info */}
      <div className="flex items-center mb-4">
        <Image src={coach.avatarUrl} alt={coach.name} className="w-12 h-12 rounded-full border-2 border-white mr-2" width={48} height={48} />
        <div>
          <div className={`font-bold ${team === 'Blue' ? 'text-white' : 'text-white'}`}>COACH {coach.name.toUpperCase()}</div>
          <div className="text-xs text-gray-100">{team} Team</div>
        </div>
      </div>
      {/* Picks */}
      <div className="flex flex-col items-center w-full mb-4">
        {picks.map((hero, idx) => (
          <div key={idx} className="flex items-center mb-2 w-full">
            <div className="relative w-16 h-16 mr-2">
              {hero ? (
                <>
                  <Image src={hero.imageUrl} alt={hero.name} className="w-16 h-16 rounded-lg border-2 border-white" width={64} height={64} />
                  {overlays && overlays[idx] && (
                    <span className="absolute top-0 left-0 bg-white text-xs font-bold px-1 rounded-br-lg text-black">{overlays[idx]}</span>
                  )}
                </>
              ) : (
                <div className="w-16 h-16 bg-gray-700 rounded-lg border-2 border-gray-500" />
              )}
            </div>
            <span className="text-sm font-semibold text-white">{players[idx] || '-'}</span>
          </div>
        ))}
      </div>
      {/* Bans */}
      <div className="flex space-x-2">
        {bans.map((hero, idx) => (
          <div key={idx} className="w-10 h-10 relative">
            {hero ? (
              <Image src={hero.imageUrl} alt={hero.name} className="w-10 h-10 rounded bg-gray-900 border-2 border-gray-400 opacity-60" width={40} height={40} />
            ) : (
              <div className="w-10 h-10 bg-gray-700 rounded border-2 border-gray-500 opacity-40" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPanel; 