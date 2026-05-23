import type { Pokemon } from "./pokemon"

export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}