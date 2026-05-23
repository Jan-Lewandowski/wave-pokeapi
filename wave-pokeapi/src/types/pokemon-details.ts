import type { PokemonType } from "./pokemon-type"

export type PokemonDetails = {
  id: number
  name: string
  height: number
  weight: number
  sprites: { front_default: string | null }
  types: PokemonType[]
}
