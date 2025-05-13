"use client";
import React from "react";
import heroes, { Hero } from "./heroes";
import {
  MOST_BANNED_HEROES,
  PRIORITY_HEROES,
  isMetaBan,
  isPriorityPick,
} from "./meta";
import { SwapRequest } from "./swap";
import ModeSelect from "./ModeSelect";
import DraftStats from "./DraftStats";
import HeroInfoModal from "./HeroInfoModal";
import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "@/components/ui/button";

const TEAM_SIZE = 5;

type Team = "Blue" | "Red";

interface DraftState {
  Blue: {
    picks: (Hero | null)[];
    bans: (Hero | null)[];
  };
  Red: {
    picks: (Hero | null)[];
    bans: (Hero | null)[];
  };
  [key: string]: {
    picks: (Hero | null)[];
    bans: (Hero | null)[];
  };
}

// Generates the draft sequence for MLBB: 5 bans (1-2-2-1), 5 picks (1-2-2-1-1), for both sides
function getDraftSequence(mode: DraftMode, firstPick: Team) {
  // Standard MLBB order for 5v5 (Ranked or Tournament):
  // Ban: 1-2-2-1 (Blue, Red, Blue, Red, Blue, Red, Blue, Red, Blue, Red)
  // Pick: 1-2-2-1-1
  const secondPick = firstPick === "Blue" ? "Red" : "Blue";
  // Ban phase (1-2-2-1):
  const banSeq = [
    { type: "ban", team: firstPick },
    { type: "ban", team: secondPick },
    { type: "ban", team: secondPick },
    { type: "ban", team: firstPick },
    { type: "ban", team: firstPick },
    { type: "ban", team: secondPick },
    { type: "ban", team: secondPick },
    { type: "ban", team: firstPick },
    { type: "ban", team: firstPick },
    { type: "ban", team: secondPick },
  ];
  // Pick phase (1-2-2-1-1):
  const pickSeq = [
    { type: "pick", team: firstPick },
    { type: "pick", team: secondPick },
    { type: "pick", team: secondPick },
    { type: "pick", team: firstPick },
    { type: "pick", team: firstPick },
    { type: "pick", team: secondPick },
    { type: "pick", team: secondPick },
    { type: "pick", team: firstPick },
    { type: "pick", team: secondPick },
    { type: "pick", team: firstPick },
  ];
  return [...banSeq, ...pickSeq];
}
const TURN_TIME = 30; // seconds;

type DraftMode = "ranked" | "tournament";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">MLBB Drafting Simulator</h1>
          <p className="text-xl mb-8">
            Master your team composition strategy with our advanced drafting
            tool
          </p>
          <Button asChild>
            <a href="/draft">Start Drafting</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Real-time Draft Simulation
                </h3>
                <p>
                  Practice pick and ban phases with an intuitive interface for
                  both teams.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hero Database</h3>
                <p>
                  Access comprehensive hero stats, abilities, and meta
                  information.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Team Analysis</h3>
                <p>
                  Get instant feedback on team composition balance and synergy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Improve Your Drafting?
          </h2>
          <p className="text-xl text-white mb-8">
            Start creating and sharing your team compositions today
          </p>
          <Button asChild>
            <a href="/draft">Try It Now</a>
          </Button>
        </div>
      </section>
    </div>
  );
}

import { ALL_ROLES, ROLE_CLASSIFICATION } from "./heroes";

function TeamDraft({
  team,
  picks,
  bans,
}: {
  team: Team;
  picks: (Hero | null)[];
  bans: (Hero | null)[];
}) {
  // Assign picked heroes to their primary role slots
  const roleMap: { [role: string]: Hero | null } = {};
  ALL_ROLES.forEach((role) => {
    roleMap[role] = picks.find((h) => h && h.roles.includes(role)) || null;
  });
  return (
    <div className="flex flex-col items-center w-56 bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className={`text-lg font-bold mb-4 text-black`}>{team} Team</h2>
      <div className="flex flex-col gap-2 w-full">
        {ALL_ROLES.map((role) => (
          <div
            key={role}
            className={`flex items-center gap-2 w-full ${
              roleMap[role] ? "bg-black" : "bg-gray-700"
            } rounded px-2 py-1 text-xs`}
          >
            <span className="w-20 font-bold text-white">{role}</span>
            <span className="flex-1">
              {roleMap[role]?.name || (
                <span className="text-gray-500">Empty</span>
              )}
            </span>
            <span className="text-gray-500">{ROLE_CLASSIFICATION[role]}</span>
          </div>
        ))}
        <div className="flex flex-col gap-1 mt-2">
          {bans.map((ban, idx) => (
            <div
              key={idx}
              className={`w-full h-8 rounded flex items-center justify-center text-xs ${
                ban ? "bg-gray-900" : "bg-gray-800"
              }`}
            >
              {ban ? ban.name : `Ban ${idx + 1}`}
            </div>
          ))}
        </div>
        {/* Team stats */}
        <div className="mt-2">
          <DraftStats team={team} picks={picks} />
        </div>
      </div>
    </div>
  );
}

// Commentary/analysis
function getTeamCommentary(picks: (Hero | null)[]) {
  const stats = picks.filter(Boolean).map((h) => h as Hero);
  const rolesPresent = ALL_ROLES.filter((role) =>
    stats.some((h) => h.roles.includes(role))
  );
  const tips = [];
  if (!rolesPresent.includes("Tank"))
    tips.push("No Tank: Consider a frontliner for durability.");
  if (!rolesPresent.includes("Support"))
    tips.push("No Support: Consider a support for sustain/utility.");
  if (!rolesPresent.includes("Mage"))
    tips.push("No Mage: Magic damage may be lacking.");
  if (!rolesPresent.includes("Marksman"))
    tips.push("No Marksman: Lacks late-game damage.");
  if (stats.reduce((a, h) => a + h.stats.attack, 0) < 30)
    tips.push("Low Physical Damage.");
  if (stats.reduce((a, h) => a + h.stats.magic, 0) < 20)
    tips.push("Low Magic Damage.");
  if (stats.reduce((a, h) => a + h.stats.defense, 0) < 20)
    tips.push("Low Durability.");
  if (stats.reduce((a, h) => a + h.stats.difficulty, 0) < 15)
    tips.push("Team is easy to execute, but may lack complexity.");
  if (tips.length === 0) tips.push("Balanced draft!");
  return tips;
}
