import React from 'react';
import { Hero, Team, DraftState } from '@/types/hero';

interface DraftBoardProps {
  draftState: DraftState;
  currentTeam: Team;
}

const DraftBoard: React.FC<DraftBoardProps> = ({ draftState, currentTeam }) => {
  const renderHeroSlot = (hero: Hero | null, index: number, type: 'picks' | 'bans') => (
    <div 
      key={`${type}-${index}`}
      className={`
        relative w-20 h-20 rounded-xl border-4 transition-all duration-300
        ${hero 
          ? 'border-white bg-gray-800 shadow-md' 
          : 'border-dashed border-gray-700 bg-gray-900'
        }
        ${type === 'bans' ? 'rotate-3' : '-rotate-3'}
      `}
    >
      {hero ? (
        <>
          <img 
            src={hero.imageUrl} 
            alt={hero.name} 
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute -top-2 -right-2">
            {hero.roles && hero.roles.length > 0 && (
              <div className="bg-white rounded-lg shadow flex flex-col items-end px-1 py-1 border border-black">
                {hero.roles.map((role) => (
                  <span
                    key={role}
                    className="text-black text-xs px-2 py-0.5 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-1 rounded-b-lg">
            <span className="text-white text-xs font-medium">{hero.name}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500 text-xs">
            {type === 'picks' ? 'Pick' : 'Ban'} {index + 1}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-8 p-6 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-lg border border-gray-800">
      {/* Blue Team */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${currentTeam === 'Blue' ? 'bg-white animate-pulse' : 'bg-gray-700'}`} />
          <h3 className={`text-xl font-bold ${currentTeam === 'Blue' ? 'text-white' : 'text-gray-500'}`}>
            Blue Team
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            {draftState.Blue.bans.map((hero, index) => renderHeroSlot(hero, index, 'bans'))}
          </div>
          <div className="flex gap-3">
            {draftState.Blue.picks.map((hero, index) => renderHeroSlot(hero, index, 'picks'))}
          </div>
        </div>
      </div>

      {/* Red Team */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${currentTeam === 'Red' ? 'bg-white animate-pulse' : 'bg-gray-700'}`} />
          <h3 className={`text-xl font-bold ${currentTeam === 'Red' ? 'text-white' : 'text-gray-500'}`}>
            Red Team
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            {draftState.Red.bans.map((hero, index) => renderHeroSlot(hero, index, 'bans'))}
          </div>
          <div className="flex gap-3">
            {draftState.Red.picks.map((hero, index) => renderHeroSlot(hero, index, 'picks'))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftBoard; 