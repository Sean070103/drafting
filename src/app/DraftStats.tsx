import React from "react";
import { Hero } from "./heroes";

interface DraftStatsProps {
  team: string;
  picks: (Hero | null)[];
}

function getTeamStats(picks: (Hero | null)[]) {
  let physical = 0, magic = 0, cc = 0, durability = 0, mobility = 0;
  picks.forEach(h => {
    if (!h) return;
    // Example stat logic (customize per your hero data)
    physical += h.stats.attack;
    magic += h.stats.magic;
    cc += h.roles.includes("Tank") || h.roles.includes("Support") ? 2 : 0;
    durability += h.stats.defense;
    mobility += h.stats.difficulty > 7 ? 2 : 1;
  });
  return { physical, magic, cc, durability, mobility };
}

export default function DraftStats({ team, picks }: DraftStatsProps) {
  const stats = getTeamStats(picks);
  return (
    <div className="bg-gray-900 rounded p-2 mt-2 text-xs text-gray-100 w-full">
      <div className="font-bold mb-1">{team} Team Stats</div>
      <div className="flex flex-wrap gap-2">
        <span>Physical: <span className="text-blue-300">{stats.physical}</span></span>
        <span>Magic: <span className="text-purple-300">{stats.magic}</span></span>
        <span>CC: <span className="text-yellow-300">{stats.cc}</span></span>
        <span>Durability: <span className="text-green-300">{stats.durability}</span></span>
        <span>Mobility: <span className="text-pink-300">{stats.mobility}</span></span>
      </div>
    </div>
  );
}
