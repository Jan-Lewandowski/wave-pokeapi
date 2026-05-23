import { useQuery } from '@tanstack/react-query'
import type { TypeListResponse } from '../types/type-list-response'

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const fetchPokemonTypes = async (): Promise<TypeListResponse> => {
  const response = await fetch('https://pokeapi.co/api/v2/type')

  if (!response.ok) {
    console.log('Error fetching pokemon types')
  }

  return response.json()
}

export default function PokemonTypeList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon-types'],
    queryFn: fetchPokemonTypes,
    staleTime: Infinity,
  })

  if (isLoading) return <p className="text-center">Loading pokemon types...</p>
  if (isError || !data) return null

  const types = data.results.filter((t) => t.name in typeColors)

  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {types.map((type) => (
        <li
          key={type.name}
          className="rounded-full px-3 py-1 text-sm font-medium capitalize text-white"
          style={{ background: typeColors[type.name] }}
        >
          {type.name}
        </li>
      ))}
    </ul>
  )
}
