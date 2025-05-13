import React from "react";
import { Hero } from "./heroes";

interface HeroInfoModalProps {
  hero: Hero | null;
  onClose: () => void;
}

export default function HeroInfoModal({ hero, onClose }: HeroInfoModalProps) {
  if (!hero) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-80 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-2">{hero.name}</h2>
        <div className="mb-2">
          <span className="font-semibold">Roles:</span> {hero.roles.join(", ")}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Tier:</span> {hero.tier}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Stats:</span>
          <ul className="ml-4 text-sm">
            <li>Attack: {hero.stats.attack}</li>
            <li>Defense: {hero.stats.defense}</li>
            <li>Magic: {hero.stats.magic}</li>
            <li>Difficulty: {hero.stats.difficulty}</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
