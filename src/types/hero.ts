export type HeroRole = 'Tank' | 'Fighter' | 'Assassin' | 'Mage' | 'Marksman' | 'Support';
export type HeroSpecialty = 'Finisher' | 'Damage' | 'Regen' | 'Charge' | 'Crowd Control' | 'Guard' | 'Initiator' | 'Control' | 'Burst' | 'Poke' | 'Chase' | 'Push' | 'Magic Damage' | 'Support' | 'Mixed Damage';
export type HeroLane = 'Gold Lane' | 'Jungling' | 'Mid Lane' | 'EXP Lane' | 'Roaming';
export type HeroRegion = 'Azrya Woodlands' | 'The Barren Lands' | 'Laboratory 1718' | 'Moniyan Empire' | 'Cadia Riverlands' | 'Northern Vale' | 'Agelta Drylands' | 'Eruditio' | 'Vonetis Sea' | 'Nebula Chronorift' | 'Kastiya' | 'Celestial Palace' | 'Los Pecados' | 'Sanctum Island';

export interface Hero {
  id: string;
  name: string;
  roles: HeroRole[];
  imageUrl: string;
  difficulty: 1 | 2 | 3; // 1: Easy, 2: Medium, 3: Hard
  specialties: HeroSpecialty[];
  lane: HeroLane[];
  region: HeroRegion;
  releaseDate: string;
  stats: {
    damage: number;
    durability: number;
    crowdControl: number;
    mobility: number;
    utility: number;
  };
  price: {
    battlePoints: number;
    diamonds: number;
    tickets?: number;
  };
}

export interface TeamComposition {
  picks: (Hero | null)[];
  bans: (Hero | null)[];
}

export interface DraftState {
  Blue: TeamComposition;
  Red: TeamComposition;
}

export type Team = 'Blue' | 'Red';
export type DraftAction = 'pick' | 'ban';
export type DraftPhase = 'ban' | 'pick' | 'swap';

export interface DraftTurn {
  team: Team;
  type: DraftAction;
  index: number;
} 