export type Role = "Tank" | "Fighter" | "Assassin" | "Mage" | "Marksman" | "Support";

export interface Hero {
  name: string;
  roles: Role[];
  stats: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  tier: string;
  popularity: number;
}

export const ALL_ROLES: Role[] = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support"
];

export const ROLE_CLASSIFICATION: { [K in Role]: string } = {
  Tank: "Frontline, absorbs damage, crowd control",
  Fighter: "Balanced offense and defense, sustained damage",
  Assassin: "Burst damage, mobility, finishes targets",
  Mage: "Magic damage, burst or poke, crowd control",
  Marksman: "Ranged sustained damage, late-game carry",
  Support: "Healing, buffs, shields, utility"
};

// All hero data below uses the Role type for strict classification.
const heroes: Hero[] = [
  {
    name: "Miya",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 3, magic: 2, difficulty: 3 },
    tier: "B",
    popularity: 70,
  },
  {
    name: "Balmond",
    roles: ["Fighter"],
    stats: { attack: 7, defense: 7, magic: 2, difficulty: 3 },
    tier: "B",
    popularity: 65,
  },
  {
    name: "Saber",
    roles: ["Assassin"],
    stats: { attack: 8, defense: 4, magic: 1, difficulty: 5 },
    tier: "A",
    popularity: 75,
  },
  {
    name: "Alice",
    roles: ["Mage", "Tank"],
    stats: { attack: 6, defense: 6, magic: 9, difficulty: 7 },
    tier: "A",
    popularity: 72,
  },
  {
    name: "Nana",
    roles: ["Mage"],
    stats: { attack: 6, defense: 4, magic: 7, difficulty: 3 },
    tier: "B",
    popularity: 68,
  },
  {
    name: "Tigreal",
    roles: ["Tank"],
    stats: { attack: 4, defense: 10, magic: 3, difficulty: 5 },
    tier: "A",
    popularity: 75,
  },
  {
    name: "Alucard",
    roles: ["Fighter", "Assassin"],
    stats: { attack: 8, defense: 6, magic: 1, difficulty: 6 },
    tier: "A",
    popularity: 73,
  },
  {
    name: "Karina",
    roles: ["Assassin"],
    stats: { attack: 7, defense: 5, magic: 8, difficulty: 7 },
    tier: "S",
    popularity: 80,
  },
  {
    name: "Akai",
    roles: ["Tank"],
    stats: { attack: 6, defense: 9, magic: 3, difficulty: 5 },
    tier: "A",
    popularity: 69,
  },
  {
    name: "Franco",
    roles: ["Tank"],
    stats: { attack: 7, defense: 8, magic: 2, difficulty: 6 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Bane",
    roles: ["Fighter", "Mage"],
    stats: { attack: 7, defense: 6, magic: 6, difficulty: 4 },
    tier: "B",
    popularity: 65,
  },
  {
    name: "Bruno",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 4, magic: 2, difficulty: 4 },
    tier: "A",
    popularity: 74,
  },
  {
    name: "Clint",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 4, magic: 2, difficulty: 4 },
    tier: "A",
    popularity: 76,
  },
  {
    name: "Rafaela",
    roles: ["Support"],
    stats: { attack: 4, defense: 6, magic: 7, difficulty: 2 },
    tier: "B",
    popularity: 65,
  },
  {
    name: "Eudora",
    roles: ["Mage"],
    stats: { attack: 7, defense: 4, magic: 8, difficulty: 3 },
    tier: "B",
    popularity: 67,
  },
  {
    name: "Zilong",
    roles: ["Fighter", "Assassin"],
    stats: { attack: 8, defense: 5, magic: 2, difficulty: 4 },
    tier: "A",
    popularity: 78,
  },
  {
    name: "Fanny",
    roles: ["Assassin"],
    stats: { attack: 9, defense: 4, magic: 2, difficulty: 10 },
    tier: "S",
    popularity: 90,
  },
  {
    name: "Layla",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 3, magic: 2, difficulty: 2 },
    tier: "B",
    popularity: 60,
  },
  {
    name: "Minotaur",
    roles: ["Tank", "Support"],
    stats: { attack: 5, defense: 9, magic: 5, difficulty: 5 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Lolita",
    roles: ["Support", "Tank"],
    stats: { attack: 5, defense: 8, magic: 5, difficulty: 6 },
    tier: "A",
    popularity: 72,
  },
  {
    name: "Hayabusa",
    roles: ["Assassin"],
    stats: { attack: 9, defense: 4, magic: 2, difficulty: 8 },
    tier: "S",
    popularity: 85,
  },
  {
    name: "Freya",
    roles: ["Fighter"],
    stats: { attack: 8, defense: 7, magic: 2, difficulty: 6 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Gord",
    roles: ["Mage"],
    stats: { attack: 8, defense: 3, magic: 9, difficulty: 5 },
    tier: "A",
    popularity: 68,
  },
  {
    name: "Natalia",
    roles: ["Assassin"],
    stats: { attack: 8, defense: 4, magic: 3, difficulty: 7 },
    tier: "A",
    popularity: 77,
  },
  {
    name: "Kagura",
    roles: ["Mage"],
    stats: { attack: 7, defense: 4, magic: 8, difficulty: 8 },
    tier: "S",
    popularity: 80,
  },
  {
    name: "Chou",
    roles: ["Fighter"],
    stats: { attack: 7, defense: 7, magic: 2, difficulty: 7 },
    tier: "A",
    popularity: 76,
  },
  {
    name: "Sun",
    roles: ["Fighter"],
    stats: { attack: 8, defense: 6, magic: 3, difficulty: 5 },
    tier: "A",
    popularity: 69,
  },
  {
    name: "Alpha",
    roles: ["Fighter"],
    stats: { attack: 7, defense: 6, magic: 3, difficulty: 6 },
    tier: "B",
    popularity: 65,
  },
  {
    name: "Ruby",
    roles: ["Fighter"],
    stats: { attack: 7, defense: 8, magic: 3, difficulty: 5 },
    tier: "A",
    popularity: 72,
  },
  {
    name: "Yi Sun-shin",
    roles: ["Assassin", "Marksman"],
    stats: { attack: 8, defense: 5, magic: 3, difficulty: 8 },
    tier: "S",
    popularity: 78,
  },
  {
    name: "Moskov",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 4, magic: 2, difficulty: 6 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Johnson",
    roles: ["Tank", "Support"],
    stats: { attack: 6, defense: 9, magic: 4, difficulty: 7 },
    tier: "A",
    popularity: 75,
  },
  {
    name: "Cyclops",
    roles: ["Mage"],
    stats: { attack: 7, defense: 4, magic: 8, difficulty: 5 },
    tier: "A",
    popularity: 68,
  },
  {
    name: "Estes",
    roles: ["Support"],
    stats: { attack: 5, defense: 6, magic: 8, difficulty: 4 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Hilda",
    roles: ["Fighter", "Tank"],
    stats: { attack: 7, defense: 8, magic: 3, difficulty: 6 },
    tier: "A",
    popularity: 72,
  },
  {
    name: "Aurora",
    roles: ["Mage"],
    stats: { attack: 7, defense: 4, magic: 8, difficulty: 6 },
    tier: "A",
    popularity: 71,
  },
  {
    name: "Lapu-Lapu",
    roles: ["Fighter"],
    stats: { attack: 8, defense: 7, magic: 3, difficulty: 7 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Vexana",
    roles: ["Mage"],
    stats: { attack: 7, defense: 5, magic: 8, difficulty: 7 },
    tier: "A",
    popularity: 69,
  },
  {
    name: "Roger",
    roles: ["Fighter", "Marksman"],
    stats: { attack: 8, defense: 6, magic: 2, difficulty: 7 },
    tier: "A",
    popularity: 73,
  },
  {
    name: "Karrie",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 4, magic: 2, difficulty: 6 },
    tier: "A",
    popularity: 75,
  },
  {
    name: "Gatotkaca",
    roles: ["Tank", "Fighter"],
    stats: { attack: 7, defense: 9, magic: 3, difficulty: 7 },
    tier: "A",
    popularity: 70,
  },
  {
    name: "Harley",
    roles: ["Assassin", "Mage"],
    stats: { attack: 8, defense: 5, magic: 8, difficulty: 7 },
    tier: "S",
    popularity: 80,
  },
  {
    name: "Irithel",
    roles: ["Marksman"],
    stats: { attack: 8, defense: 4, magic: 2, difficulty: 6 },
    tier: "A",
    popularity: 72,
  },
  {
    name: "Grock",
    roles: ["Tank", "Fighter"],
    stats: { attack: 7, defense: 9, magic: 3, difficulty: 8 },
    tier: "A",
    popularity: 74,
  },
  // Add more heroes as needed
];

// Utility: Get all unique roles for filtering (typed)
export const getAllRoles = (): Role[] => {
  const roleSet = new Set<Role>();
  heroes.forEach(h => h.roles.forEach(r => roleSet.add(r)));
  return Array.from(roleSet);
};

// Utility: Get heroes by role
export const getHeroesByRole = (role: Role): Hero[] =>
  heroes.filter(h => h.roles.includes(role));

export default heroes;
