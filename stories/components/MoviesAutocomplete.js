import React from 'react';
import SQFormAsyncAutocomplete from '../../src/components/SQForm/SQFormAsyncAutocomplete';
import {useQueryMovies} from './useQueryMovies';

const getMovieOptions = movieData => {
  if (!movieData) return [];

  return (movieData?.Search || []).map(movie => ({
    label: movie.Title,
    value: movie.Title
  }));
};

// http://www.omdbapi.com/
export default function MoviesAutocomplete({name}) {
  const [inputValue, setInputValue] = React.useState('');
  const {movieData, loading} = useQueryMovies(inputValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const isLoading = isOpen && loading;

  React.useEffect(() => {
    if (isLoading) return;
    const movieOptions = getMovieOptions(movieData);
    setOptions(movieOptions);
  }, [isLoading, movieData]);

  React.useEffect(() => {
    if (!isOpen) {
      setOptions([]);
    }
  }, [isOpen]);

  return (
    <SQFormAsyncAutocomplete
      name={name}
      label="Movies"
      size={10}
      handleAsyncInputChange={value => setInputValue(value)}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      loading={isLoading}
      isRequired
    >
      {options}
    </SQFormAsyncAutocomplete>
  );
}
