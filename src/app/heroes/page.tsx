'use client';

import { useState, useMemo } from 'react';
import { heroes } from '@/data/heroes';
import { Hero, HeroRole } from '@/types/hero';
import Image from 'next/image';
import HeroDetails from '@/components/HeroDetails';

export default function HeroesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<HeroRole[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  
  const allRoles = useMemo(() => {
    const roles = new Set<HeroRole>();
    heroes.forEach(hero => hero.roles.forEach(role => roles.add(role)));
    return Array.from(roles);
  }, []);
  
  const filteredHeroes = useMemo(() => {
    return heroes.filter(hero => {
      // Search query filter
      if (searchQuery && !hero.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Role filter
      if (selectedRoles.length > 0 && !selectedRoles.some(role => hero.roles.includes(role))) {
        return false;
      }
      
      // Difficulty filter
      if (selectedDifficulty !== null && hero.difficulty !== selectedDifficulty) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedRoles, selectedDifficulty]);
  
  const toggleRole = (role: HeroRole) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">MLBB Heroes</h1>
        
        {/* Filters */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Heroes
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Role
              </label>
              <div className="flex flex-wrap gap-2">
                {allRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedRoles.includes(role)
                        ? 'bg-black text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Difficulty
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(
                      selectedDifficulty === difficulty ? null : difficulty
                    )}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedDifficulty === difficulty
                        ? 'bg-black text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredHeroes.map(hero => (
            <button
              key={hero.id}
              onClick={() => setSelectedHero(hero)}
              className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
            >
              <div className="aspect-square relative mb-3">
                <Image
                  src={hero.imageUrl}
                  alt={hero.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">{hero.name}</h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {hero.roles.map(role => (
                    <span
                      key={role}
                      className="px-2 py-0.5 bg-black text-white rounded-full text-xs"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < hero.difficulty ? 'bg-white' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Hero Details Modal */}
        {selectedHero && (
          <HeroDetails
            hero={selectedHero}
            onClose={() => setSelectedHero(null)}
          />
        )}
      </div>
    </div>
  );
} 