import React from 'react';
import SQFormAsyncAutocomplete from '../../src/components/SQForm/SQFormAsyncAutocomplete';
import {useQueryPokemon} from './useQueryPokemon';

const getPokemonOptions = pokemonData => {
  if (!pokemonData) return [];

  if (Array.isArray(pokemonData?.results)) {
    return pokemonData.results.map(pokemon => ({
      label: pokemon.name,
      value: pokemon.name
    }));
  }
  return [
    {
      label: pokemonData.name,
      value: pokemonData.name
    }
  ];
};

export default function PokemonAutocomplete({name}) {
  const [inputValue, setInputValue] = React.useState('');
  const {pokemonData, loading} = useQueryPokemon(inputValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const isLoading = isOpen && loading;

  React.useEffect(() => {
    if (isLoading) return;
    const pokemonOptions = getPokemonOptions(pokemonData);
    setOptions(pokemonOptions);
  }, [isLoading, pokemonData]);

  React.useEffect(() => {
    if (!isOpen) {
      setOptions([]);
    }
  }, [isOpen]);

  return (
    <SQFormAsyncAutocomplete
      name={name}
      label="Pokemon"
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
