import React, { useState } from 'react';
import { Hero, HeroRole } from '@/types/hero';

const ROLES: HeroRole[] = ['Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'];

interface MiniStageProps {
  heroes: Hero[];
  onHeroClick: (hero: Hero) => void;
  isUserTurn: boolean;
  currentAction: 'pick' | 'ban';
  disabled?: boolean;
}

const MiniStage: React.FC<MiniStageProps> = ({ heroes, onHeroClick, isUserTurn, currentAction, disabled }) => {
  const [roleFilter, setRoleFilter] = useState<'All' | HeroRole>('All');

  // Sort heroes by role and name
  let filteredHeroes: Hero[] = [];
  if (roleFilter === 'All') {
    // Group and sort by role, then by name
    ROLES.forEach(role => {
      const group = heroes
        .filter(hero => hero.roles[0] === role)
        .sort((a, b) => a.name.localeCompare(b.name));
      filteredHeroes = filteredHeroes.concat(group);
    });
  } else {
    filteredHeroes = heroes
      .filter(hero => hero.roles.includes(roleFilter))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="flex flex-col justify-center items-center bg-black rounded-lg p-4 mt-4 shadow-lg">
      <div className="w-full text-center mb-2 text-lg font-bold text-white">
        {isUserTurn
          ? `Your turn to ${currentAction === 'pick' ? 'Pick' : 'Ban'} a Hero`
          : 'Waiting for enemy...'}
      </div>
      {/* Tab bar for roles */}
      <div className="flex flex-row justify-center gap-2 mb-4 w-full">
        <button
          type="button"
          className={`px-4 py-2 rounded font-semibold text-sm ${roleFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-blue-800'}`}
          onClick={() => setRoleFilter('All')}
        >
          All
        </button>
        {ROLES.map(role => (
          <button
            type="button"
            key={role}
            className={`px-4 py-2 rounded font-semibold text-sm ${roleFilter === role ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-blue-800'}`}
            onClick={() => setRoleFilter(role)}
          >
            {role}
          </button>
        ))}
      </div>
      {/* Hero grid */}
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {filteredHeroes.map(hero => (
          <button
            key={hero.id}
            onClick={() => isUserTurn && !disabled && onHeroClick(hero)}
            disabled={!isUserTurn || disabled}
            className={`w-16 h-16 rounded-lg border-2 ${isUserTurn ? 'border-white hover:border-gray-400' : 'border-gray-700 opacity-50 cursor-not-allowed'} bg-black flex items-center justify-center transition`}
          >
            <img src={hero.imageUrl} alt={hero.name} className="w-14 h-14 object-cover rounded" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniStage; 