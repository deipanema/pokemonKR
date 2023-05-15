import axios, { AxiosResponse } from 'axios';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { Ability, AbilityResponse } from '../types';

type ReturnType = AxiosResponse<AbilityResponse>;

export default function useAbilities(
  abilities: Array<Ability>
): Array<UseQueryResult<ReturnType, Error>> {
  const queries = abilities.map(({ ability }, idx) => ({
    queryKey: ['ability', idx],
    queryFn: () => axios.get(ability.url),
  }));

  return useQueries({ queries }) as Array<UseQueryResult<ReturnType, Error>>;
}
