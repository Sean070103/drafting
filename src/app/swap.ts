// Swapping phase logic
import { Hero } from "./heroes";

export interface SwapRequest {
  from: number; // index of teammate requesting swap
  to: number;   // index of teammate to swap with
  hero: Hero;
}

export interface SwapState {
  requests: SwapRequest[];
  swaps: { [team: string]: { [idx: number]: Hero | null } };
}
