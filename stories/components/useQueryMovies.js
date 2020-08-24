import useSWR from 'swr';

async function fetcher(route) {
  const response = await fetch(route);
  const json = await response.json();
  return json;
}

const APIKEY = 'de7d069c'; // registered to lucas.homer@selectquote.com

export function useQueryMovies(title) {
  const {data: movieData, error} = useSWR(
    `http://www.omdbapi.com/?s=${title}&apikey=${APIKEY}`,
    fetcher
  );

  return {
    movieData,
    error,
    loading: !movieData && !error
  };
}
