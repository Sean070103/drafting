import { DraftState, Team, DraftAction, Hero } from '@/types/hero';

export const getNextTurn = (
  currentTeam: Team,
  currentAction: DraftAction,
  currentIndex: number
): { team: Team; action: DraftAction; index: number } => {
  const nextTeam = currentTeam === 'Blue' ? 'Red' : 'Blue';
  
  // If we're at the last ban, move to picks
  if (currentAction === 'ban' && currentIndex === 2) {
    return { team: nextTeam, action: 'pick', index: 0 };
  }
  
  // If we're at the last pick of the first round, move to second round
  if (currentAction === 'pick' && currentIndex === 4) {
    return { team: nextTeam, action: 'pick', index: 0 };
  }
  
  return { team: nextTeam, action: currentAction, index: currentIndex + 1 };
};

export const isDraftComplete = (draftState: DraftState): boolean => {
  const blueComplete = 
    draftState.Blue.picks.every(pick => pick !== null) &&
    draftState.Blue.bans.every(ban => ban !== null);
    
  const redComplete = 
    draftState.Red.picks.every(pick => pick !== null) &&
    draftState.Red.bans.every(ban => ban !== null);
    
  return blueComplete && redComplete;
};

// API calls (to be implemented)
export const startDraft = async (): Promise<DraftState> => {
  // TODO: Implement API call to start draft
  return {
    Blue: { picks: Array(5).fill(null), bans: Array(3).fill(null) },
    Red: { picks: Array(5).fill(null), bans: Array(3).fill(null) }
  };
};

// Suppress linter warning for unused parameters by eslint-disable-next-line
export const makePick = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _team: Team,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _hero: Hero,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _index: number
): Promise<DraftState> => {
  // TODO: Implement API call to make pick
  throw new Error('Not implemented');
};

export const makeBan = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _team: Team,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _hero: Hero,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _index: number
): Promise<DraftState> => {
  // TODO: Implement API call to make ban
  throw new Error('Not implemented');
}; 