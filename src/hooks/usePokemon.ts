import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult, useQueries } from '@tanstack/react-query';
import { PokemonResponse } from '../types';

/**
 * 매개변수 id를 전달받아 해당 한 포켓몬의 정보를 가져옵니다.
 * id가 전달되지 않으면 포켓몬 목록을 가져옵니다.
 * @param {string} id - 포켓몬 id
 * @returns
 */
const pokemonAPI = (id?: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ''}`, {
    params: { limit: 151 },
  });

export default function usePokemon<T>(
  id?: string
): UseQueryResult<AxiosResponse<T>, Error> {
  return useQuery(id ? ['pokemon', id] : ['pokemon'], () => pokemonAPI(id));
}

export const useEvolutionChains = (
  names: string[]
): Array<UseQueryResult<AxiosResponse<PokemonResponse>, Error>> => {
  const queries = names.map((name, idx) => ({
    queryKey: ['evolution', `${name}_${idx}`],
    queryFn: () => pokemonAPI(name),
  }));

  return useQueries({ queries }) as Array<
    UseQueryResult<AxiosResponse<PokemonResponse>, Error>
  >;
};
