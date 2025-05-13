import { Hero } from '@/types/hero';
import Image from 'next/image';

interface HeroDetailsProps {
  hero: Hero;
  onClose: () => void;
}

export default function HeroDetails({ hero, onClose }: HeroDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{hero.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square">
            <Image
              src={hero.imageUrl}
              alt={hero.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {hero.roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 bg-black text-white rounded-full text-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {hero.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Stats</h3>
              <div className="space-y-2">
                {Object.entries(hero.stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center gap-2">
                    <span className="text-gray-400 w-32 capitalize">{stat}</span>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${(value / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-300 w-8 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Difficulty</h3>
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < hero.difficulty ? 'bg-white' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 