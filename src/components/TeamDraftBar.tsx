import React from 'react';
import Image from 'next/image';
import { Hero } from '@/types/hero';

interface PlayerInfo {
  name: string;
  avatar?: string;
  status?: string; // e.g., 'Buffed', 'Nerfed'
}

interface TeamDraftBarProps {
  team: 'left' | 'right';
  teamName: string;
  teamLogo: string;
  teamColor: string; // Tailwind color class
  players: PlayerInfo[];
  picks: (Hero | null)[];
  bans: (Hero | null)[];
}

const fallbackHero = '/fallback-hero.png';
const fallbackCoach = '/fallback-coach.png';

const TeamDraftBar: React.FC<TeamDraftBarProps> = ({
  team,
  teamName,
  teamLogo,
  teamColor,
  players,
  picks,
  bans,
}) => {
  return (
    <div className={`flex flex-col items-center w-[40%] py-6 px-2 ${teamColor.replace(/bg-gradient-to-br from-[^ ]+ to-[^ ]+/, 'bg-black')} rounded-xl shadow-lg`}>
      {/* Coach */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src={teamLogo}
          alt={teamName}
          onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackCoach; }}
          className="w-14 h-14 rounded-full border-4 border-white shadow-lg bg-gray-900 object-cover"
        />
        <span className="mt-2 text-lg font-bold text-white tracking-wide uppercase drop-shadow">{teamName}</span>
        <span className={`uppercase text-xs font-semibold text-white`}>{team === 'left' ? 'Blue Team' : 'Red Team'}</span>
      </div>
      {/* Picks */}
      <div className="flex flex-row items-end justify-center gap-3 mb-3">
        {players.map((player, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative w-16 h-16 rounded-lg border-2 border-white bg-black shadow-md flex items-center justify-center overflow-hidden">
              <Image
                src={picks[idx]?.imageUrl || fallbackHero}
                alt={picks[idx]?.name || 'Empty'}
                onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackHero; }}
                className="w-full h-full object-cover rounded"
              />
              {player.status && (
                <span className="absolute top-0 left-0 bg-white text-black text-xs font-bold px-2 py-1 rounded-br-lg shadow-lg">
                  +{player.status.toUpperCase()}
                </span>
              )}
              {!picks[idx] && (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">Empty</span>
              )}
            </div>
            <span className="text-xs text-white mt-1 font-semibold drop-shadow-sm">{player.name}</span>
          </div>
        ))}
      </div>
      {/* Bans */}
      <div className="flex flex-row gap-2">
        {bans.map((ban, idx) => (
          <div key={idx} className="w-10 h-10 rounded-lg border border-gray-500 bg-black flex items-center justify-center overflow-hidden shadow-sm">
            <Image
              src={ban?.imageUrl || fallbackHero}
              alt={ban?.name || 'Ban'}
              onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackHero; }}
              className="w-full h-full object-cover rounded"
              style={{ filter: ban ? 'grayscale(1)' : 'none', opacity: ban ? 0.7 : 0.3 }}
            />
            {!ban && (
              <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">Ban</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDraftBar; 