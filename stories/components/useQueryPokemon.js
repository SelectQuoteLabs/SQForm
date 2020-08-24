import useSWR from 'swr';

async function fetcher(route) {
  const response = await fetch(route);
  const json = await response.json();
  return json;
}

// https://pokeapi.co/docs/v2#pokemon-section
export function useQueryPokemon(pokemon) {
  const {data: pokemonData, error} = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    fetcher
  );

  return {
    pokemonData,
    error,
    loading: !pokemonData && !error
  };
}
