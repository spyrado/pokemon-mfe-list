import { IPokemonListResult } from ".";

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListResult[];
}