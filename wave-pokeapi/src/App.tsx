import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PokemonCard from './components/pokemon-card'
import PokemonTypeList from './components/pokemon-type-list'
import { useDebouncedValue } from './hooks/use-debounced-value'
import type { PokemonListResponse } from './types/pokemon-list-response'


const fetchAllPokemons = async (): Promise<PokemonListResponse> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')

  if (!response.ok) {
    console.log('Error fetching pokemons')
  }

  return response.json()
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageLimit, setPageLimit] = useState(6)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: fetchAllPokemons,
    staleTime: Infinity,
  })

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500)

  const allPokemons = data?.results ?? []
  const normalizedSearchQuery = debouncedSearchTerm.trim().toLowerCase()
  const isSearching = normalizedSearchQuery.length > 0

  const visiblePokemons = isSearching
    ? allPokemons.filter((p) =>
      p.name.toLowerCase().includes(normalizedSearchQuery),
    )
    : allPokemons.slice(0, pageLimit)

  const reachedMax = pageLimit >= 24
  const canLoadMore = !isSearching && !reachedMax && allPokemons.length > pageLimit

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex flex-col items-center gap-2">
        <header>
          <p className="text-center flex flex-row items-center gap-2">
            <img src="favicon.png" alt="pokeball-icon" />
            <h1 className="text-2xl font-bold text-orange-400">Pokemon Explorer</h1>
          </p>
        </header>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-center bg-gray-800 text-white rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <PokemonTypeList />
      </div>
      {isLoading && <p className="text-center text-white">Loading pokemons...</p>}
      {isError && <p className="text-center text-white">Error fetching pokemons</p>}
      {data && visiblePokemons.length === 0 && (
        <p className="text-center text-white">No pokemons with name: "{debouncedSearchTerm}"</p>
      )}
      {visiblePokemons.length > 0 && (
        <ul className="grid grid-cols-3 gap-3">
          {visiblePokemons.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard url={pokemon.url} />
            </li>
          ))}
        </ul>
      )}
      {canLoadMore && (
        <button
          onClick={() =>
            setPageLimit((currentLimit) =>
              Math.min(currentLimit + 6, 24),
            )
          }
          className="mx-auto mt-4 block rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default App
