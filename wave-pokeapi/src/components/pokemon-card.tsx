import Chip from '@mui/material/Chip';
import { useQuery } from '@tanstack/react-query';
import type { PokemonDetails } from '../types/pokemon-details';
import type { PokemonType } from '../types/pokemon-type';

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

const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
  const response = await fetch(url)

  if (!response.ok) {
    console.log('Error fetching pokemon details')
  }

  return response.json()
}

export default function PokemonCard({ url }: { url: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', url],
    queryFn: () => fetchPokemonDetails(url),
  })

  if (isLoading) return <div className="rounded border p-3">Loading pokemon details...</div>
  if (isError || !data)
    return <div className="rounded border p-3">Failed to load pokemon details</div>

  const spriteImage = data.sprites.front_default

  const buildTypeGradient = (types: PokemonType[]): string => {
    const colors = types.map(
      ({ type }) => typeColors[type.name],
    )

    return `linear-gradient(90deg, ${colors.join(', ')})`
  }

  return (
    <div className="rounded-xl border p-3 text-center" style={{ background: buildTypeGradient(data.types) }}>
      {spriteImage && (
        <img src={spriteImage} alt={data.name} className="mx-auto h-24 w-24" />
      )}
      <p className="font-semibold capitalize">{data.name}</p>
      <p className="text-sm">#{String(data.id).padStart(3, '0')}</p>

      <ul className="mt-1 flex justify-center gap-1">
        {data.types.map(({ type }) => (
          <li
            key={type.name}
          >
            <Chip label={type.name} className="capitalize" />
          </li>
        ))}
      </ul>
    </div>
  )
}
