// Meta and priority hero logic for MLBB Drafting Simulator
import { Hero } from "./heroes";

// Example: Top 10 most banned heroes (simulate meta)
export const MOST_BANNED_HEROES: string[] = [
  "Fanny", "Valentina", "Wanwan", "Ling", "Joy",
  "Kaja", "Martis", "Hayabusa", "Gloo", "Arlott"
];

// Example: Top 10 priority picks (simulate meta)
export const PRIORITY_HEROES: string[] = [
  "Fredrinn", "Valentina", "Karrie", "Baxia", "Lancelot",
  "Pharsa", "Claude", "Benedetta", "Bane", "Beatrix"
];

export function isMetaBan(hero: Hero): boolean {
  return MOST_BANNED_HEROES.includes(hero.name);
}

export function isPriorityPick(hero: Hero): boolean {
  return PRIORITY_HEROES.includes(hero.name);
}
