import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  pokemonId: string;
};

export default function PokemonDetail(): JSX.Element {
  const { pokemonId } = useParams<Params>();
  return <div>Detail Page POKEMON ID: {pokemonId}</div>;
}
