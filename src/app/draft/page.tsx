'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { heroes } from '@/data/heroes';
import { DraftState, Hero, Team, DraftAction, DraftTurn } from '@/types/hero';
import Image from 'next/image';
import HeroDetails from '@/components/HeroDetails';
import TeamAnalysis from '@/components/TeamAnalysis';
import { saveDraft, getDraftById, SavedDraft } from '@/utils/draftStorage';
import { useSearchParams } from 'next/navigation';
import TeamPanel from '@/components/TeamPanel';
import DraftStatus from '@/components/DraftStatus';
import TeamDraftBar from '@/components/TeamDraftBar';
import DraftOverlay from '@/components/DraftOverlay';
import MiniStage from '@/components/MiniStage';
import { teams } from '@/data/teams';

const TEAM_SIZE = 5;
const BAN_SIZE = 5;
const TURN_TIME = 30;

type DraftMode = 'ranked' | 'tournament';

// Add TeamObject type for real team objects
interface TeamObject {
  name: string;
  logo: string;
  color: string;
  players: { role: string; country: string; name: string }[];
}

// Generate draft sequence based on mode and first pick
function getDraftSequence(mode: DraftMode, firstPick: Team): DraftTurn[] {
  const sequence: DraftTurn[] = [];
  const secondPick = firstPick === 'Blue' ? 'Red' : 'Blue';
  
  if (mode === 'ranked') {
    // Ranked mode: 5 bans (1-2-2), 5 picks (1-2-2)
    // Ban phase
    sequence.push({ team: firstPick, type: 'ban', index: 0 });
    sequence.push({ team: secondPick, type: 'ban', index: 0 });
    sequence.push({ team: secondPick, type: 'ban', index: 1 });
    sequence.push({ team: firstPick, type: 'ban', index: 1 });
    sequence.push({ team: firstPick, type: 'ban', index: 2 });
    
    // Pick phase
    sequence.push({ team: firstPick, type: 'pick', index: 0 });
    sequence.push({ team: secondPick, type: 'pick', index: 0 });
    sequence.push({ team: secondPick, type: 'pick', index: 1 });
    sequence.push({ team: firstPick, type: 'pick', index: 1 });
    sequence.push({ team: firstPick, type: 'pick', index: 2 });
    sequence.push({ team: secondPick, type: 'pick', index: 2 });
    sequence.push({ team: secondPick, type: 'pick', index: 3 });
    sequence.push({ team: firstPick, type: 'pick', index: 3 });
    sequence.push({ team: firstPick, type: 'pick', index: 4 });
    sequence.push({ team: secondPick, type: 'pick', index: 4 });
  } else {
    // Tournament mode: 10 bans (1-2-2-2-2-1), 5 picks (1-2-2)
    // Ban phase
    sequence.push({ team: firstPick, type: 'ban', index: 0 });
    sequence.push({ team: secondPick, type: 'ban', index: 0 });
    sequence.push({ team: secondPick, type: 'ban', index: 1 });
    sequence.push({ team: firstPick, type: 'ban', index: 1 });
    sequence.push({ team: firstPick, type: 'ban', index: 2 });
    sequence.push({ team: secondPick, type: 'ban', index: 2 });
    sequence.push({ team: secondPick, type: 'ban', index: 3 });
    sequence.push({ team: firstPick, type: 'ban', index: 3 });
    sequence.push({ team: firstPick, type: 'ban', index: 4 });
    sequence.push({ team: secondPick, type: 'ban', index: 4 });
    
    // Pick phase
    sequence.push({ team: firstPick, type: 'pick', index: 0 });
    sequence.push({ team: secondPick, type: 'pick', index: 0 });
    sequence.push({ team: secondPick, type: 'pick', index: 1 });
    sequence.push({ team: firstPick, type: 'pick', index: 1 });
    sequence.push({ team: firstPick, type: 'pick', index: 2 });
    sequence.push({ team: secondPick, type: 'pick', index: 2 });
    sequence.push({ team: secondPick, type: 'pick', index: 3 });
    sequence.push({ team: firstPick, type: 'pick', index: 3 });
    sequence.push({ team: firstPick, type: 'pick', index: 4 });
    sequence.push({ team: secondPick, type: 'pick', index: 4 });
  }
  
  return sequence;
}

// Get meta recommendations based on current draft state
function getMetaRecommendations(draft: DraftState | null, currentTurn: DraftTurn | null): Hero[] {
  if (!draft || !currentTurn) return [];
  
  const { team, type } = currentTurn;
  const enemyTeam = team === 'Blue' ? 'Red' : 'Blue';
  
  // Get already picked/banned heroes
  const pickedHeroes = [...(draft.Blue?.picks || []), ...(draft.Red?.picks || [])].filter(Boolean) as Hero[];
  const bannedHeroes = [...(draft.Blue?.bans || []), ...(draft.Red?.bans || [])].filter(Boolean) as Hero[];
  
  // Filter out unavailable heroes
  const availableHeroes = heroes.filter(hero => 
    !pickedHeroes.includes(hero) && !bannedHeroes.includes(hero)
  );
  
  // Score heroes based on meta relevance
  const scoredHeroes = availableHeroes.map(hero => {
    let score = 0;
    
    // Base score on hero stats
    score += hero.stats.damage * 0.3;
    score += hero.stats.durability * 0.2;
    score += hero.stats.crowdControl * 0.2;
    score += hero.stats.mobility * 0.15;
    score += hero.stats.utility * 0.15;
    
    // Adjust score based on team composition
    const teamPicks = (draft[team]?.picks || []).filter(Boolean) as Hero[];
    const enemyPicks = (draft[enemyTeam]?.picks || []).filter(Boolean) as Hero[];
    
    // Check for role balance
    const teamRoles = teamPicks.flatMap(h => h.roles);
    const missingRoles = ['Tank', 'Fighter', 'Mage', 'Marksman', 'Support'].filter(
      role => !teamRoles.includes(role as any)
    );
    
    if (missingRoles.some(role => hero.roles.includes(role as any))) {
      score += 2;
    }
    
    // Check for synergy with existing picks
    teamPicks.forEach(pick => {
      if (pick.roles.some(role => hero.roles.includes(role))) {
        score += 0.5;
      }
    });
    
    // Check for counter-picks against enemy team
    enemyPicks.forEach(pick => {
      if (hero.stats.damage > pick.stats.durability) {
        score += 0.5;
      }
      if (hero.stats.crowdControl > pick.stats.mobility) {
        score += 0.5;
      }
    });
    
    return { hero, score };
  });
  
  // Sort by score and return top 5 recommendations
  return scoredHeroes
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.hero);
}

function getRandomAvailableHero(draft: DraftState): Hero | null {
  const picked = [...draft.Blue.picks, ...draft.Red.picks].filter(Boolean) as Hero[];
  const banned = [...draft.Blue.bans, ...draft.Red.bans].filter(Boolean) as Hero[];
  const available = heroes.filter(h =>
    !picked.includes(h) && !banned.includes(h)
  );
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

export default function DraftPage() {
  const [showSetup, setShowSetup] = useState(true);
  const [draftMode] = useState<'ranked' | 'tournament'>('tournament');
  const [userSide, setUserSide] = useState<'Blue' | 'Red'>('Blue');
  const [userTeam, setUserTeam] = useState<TeamObject | null>(null);
  const [opponentTeam, setOpponentTeam] = useState<TeamObject | null>(null);
  const [draft, setDraft] = useState<DraftState>({
    Blue: { picks: Array(5).fill(null), bans: Array(5).fill(null) },
    Red: { picks: Array(5).fill(null), bans: Array(5).fill(null) }
  });
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(TURN_TIME);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [showHeroDetails, setShowHeroDetails] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [isAITurn, setIsAITurn] = useState(false);

  const draftSequence = useMemo(() => getDraftSequence(draftMode, userSide), [draftMode, userSide]);
  const currentTurn = useMemo(() => draftSequence[turn], [draftSequence, turn]);
  const blueTeamData = userSide === 'Blue' ? userTeam : opponentTeam;
  const redTeamData = userSide === 'Red' ? userTeam : opponentTeam;

  // Setup phase: user picks team and side
  const handleStartDraft = useCallback(() => {
    if (!userTeam) return;
    const otherTeams = teams.filter(t => t.name !== userTeam.name);
    const randomOpponent = otherTeams[Math.floor(Math.random() * otherTeams.length)];
    setOpponentTeam(randomOpponent);
    setShowSetup(false);
  }, [userTeam]);

  const handleHeroSelect = useCallback((hero: Hero) => {
    if (!currentTurn || currentTurn.team !== userSide || isAITurn) return;
    setDraft(prev => {
      const newDraft = { ...prev };
      const idx = currentTurn.index;
      if (currentTurn.type === 'ban') {
        newDraft[userSide].bans[idx] = hero;
      } else {
        newDraft[userSide].picks[idx] = hero;
      }
      return newDraft;
    });
    setTurn(prev => prev + 1);
    setTimer(TURN_TIME);
  }, [currentTurn, isAITurn, userSide]);

  useEffect(() => {
    if (turn >= draftSequence.length) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          setTurn(t => t + 1);
          return TURN_TIME;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [turn, draftSequence.length]);

  useEffect(() => {
    if (!currentTurn || currentTurn.team === userSide) {
      setIsAITurn(false);
      return;
    }
    setIsAITurn(true);
    const aiTimeout = setTimeout(() => {
      const hero = getRandomAvailableHero(draft);
      if (hero) {
        setDraft(prev => {
          const newDraft = { ...prev };
          const idx = currentTurn.index;
          if (currentTurn.type === 'ban') {
            newDraft[currentTurn.team].bans[idx] = hero;
          } else {
            newDraft[currentTurn.team].picks[idx] = hero;
          }
          return newDraft;
        });
      }
      setTurn(prev => prev + 1);
      setTimer(TURN_TIME);
      setIsAITurn(false);
    }, 1200);
    return () => clearTimeout(aiTimeout);
  }, [currentTurn, draft, userSide]);

  const isHeroAvailable = useCallback((hero: Hero) => {
    return !draft.Blue.picks.includes(hero) &&
           !draft.Red.picks.includes(hero) &&
           !draft.Blue.bans.includes(hero) &&
           !draft.Red.bans.includes(hero);
  }, [draft]);

  const handleHeroClick = useCallback((hero: Hero) => {
    if (isHeroAvailable(hero)) {
      handleHeroSelect(hero);
    } else {
      setSelectedHero(hero);
      setShowHeroDetails(true);
    }
  }, [isHeroAvailable, handleHeroSelect]);

  // Now, after all hooks, you can do early returns:
  if (showSetup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-8">Draft Setup</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Pick Your Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            {teams.map(team => (
              <button
                key={team.name}
                className={`bg-white rounded-lg shadow p-4 flex flex-col items-center hover:scale-105 transition ${userTeam?.name === team.name ? 'ring-4 ring-blue-500' : ''}`}
                onClick={() => setUserTeam(team)}
              >
                <Image src={team.logo} alt={team.name} className="w-20 h-20 object-contain mb-2" width={80} height={80} />
                <span className="font-bold text-black">{team.name}</span>
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Pick Your Side</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-6 py-3 rounded-lg ${userSide === 'Blue' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setUserSide('Blue')}
            >Blue Side (First Pick)</button>
            <button
              className={`px-6 py-3 rounded-lg ${userSide === 'Red' ? 'bg-red-600' : 'bg-gray-700'}`}
              onClick={() => setUserSide('Red')}
            >Red Side (Second Pick)</button>
          </div>
          <button
            className="mt-4 px-8 py-3 bg-green-500 rounded-lg font-bold"
            onClick={handleStartDraft}
            disabled={!userTeam}
          >Start Draft</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      <DraftOverlay
        matchScore={''}
        phase={currentTurn?.type === 'ban' ? 'BAN PHASE' : 'PICK PHASE'}
        timer={timer}
        logo={''}
        details={''}
      />
      <div className="flex flex-row w-full items-center justify-between mt-8">
        <TeamDraftBar
          team="left"
          teamName={blueTeamData?.name || 'Blue Team'}
          teamLogo={blueTeamData?.logo || ''}
          players={blueTeamData?.players || []}
          picks={draft.Blue.picks}
          bans={draft.Blue.bans}
          teamColor={blueTeamData?.color || 'bg-black'}
        />
        <TeamDraftBar
          team="right"
          teamName={redTeamData?.name || 'Red Team'}
          teamLogo={redTeamData?.logo || ''}
          players={redTeamData?.players || []}
          picks={draft.Red.picks}
          bans={draft.Red.bans}
          teamColor={redTeamData?.color || 'bg-black'}
        />
      </div>
      <MiniStage
        heroes={heroes}
        onHeroClick={handleHeroClick}
        isUserTurn={!isAITurn && currentTurn?.team === userSide}
        currentAction={currentTurn?.type || 'pick'}
      />
      
      {/* Hero Details Modal */}
      {showHeroDetails && selectedHero && (
        <HeroDetails
          hero={selectedHero}
          onClose={() => {
            setShowHeroDetails(false);
            setSelectedHero(null);
          }}
        />
      )}
      
      {/* Save Draft Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Save Draft</h2>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Enter draft name..."
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!draftName.trim()) return;
                  saveDraft(draftName, draft);
                  setShowSaveModal(false);
                  setDraftName('');
                }}
                disabled={!draftName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 