import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EvolutionChainResponse } from '../types';

export default function useEvolutionChain(
  url?: string
): UseQueryResult<AxiosResponse<EvolutionChainResponse>, Error> {
  return useQuery(['evolution', { url }], () => (url ? axios.get(url) : null));
}
