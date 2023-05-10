import React from 'react';
import styled from '@emotion/styled/macro';
import usePokemon from '../hooks/usePokemon';
import { formatNumbering } from '../utils';
//import { ListResponse } from '../types';

type SimplePokemonInfo = {
  name: string;
  url: string;
};

type ListResponse = {
  count: number;
  results: Array<SimplePokemonInfo>;
};

const Base = styled.div`
  margin-top: 24px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 180px);
`;

const Loading = styled.img``;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  box-shadow: 6px 4px 14px 5px rgba(0, 0, 0, 0.21);
  border-radius: 12px;
  & + & {
    margin-top: 18px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Image = styled.img``;

const Name = styled.p`
  margin: 0;
  padding: 0 0 0 12px;
  flex: 1 1 100%;
  color: #374151;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
`;

const Index = styled.p`
  position: absolute;
  margin: 0;
  padding: 0;
  right: 16px;
  bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #d1d5db;
`;

const getImageUrl = (pokemonIndex: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

export default function PokemonList(): JSX.Element {
  const { isLoading, error, data } = usePokemon<ListResponse>();

  if (isLoading)
    return (
      <LoadingWrapper>
        <Loading src='/assets/loading.gif' alt='loading' />
      </LoadingWrapper>
    );

  if (error)
    return (
      <LoadingWrapper>
        <span>An error has occurred: {error.message}</span>
      </LoadingWrapper>
    );

  return (
    <Base>
      <List>
        {data?.data.results.map((pokemon, idx) => (
          <ListItem key={pokemon.name}>
            <Image src={getImageUrl(idx + 1)} />
            <Name>{pokemon.name}</Name>
            <Index>{formatNumbering(idx + 1)}</Index>
          </ListItem>
        ))}
      </List>
    </Base>
  );
}
