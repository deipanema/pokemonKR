import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SpeciesResponse } from '../types';

const speciesAPI = (id: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

export default function useSpecies(id: string) {
  return useQuery<AxiosResponse<SpeciesResponse>, Error>(['species', id], () =>
    speciesAPI(id)
  );
}
