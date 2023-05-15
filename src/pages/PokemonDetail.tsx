import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import TabList from '../components/TabList';
import UsePokemon from '../hooks/usePokemon';
import UseSpecies from '../hooks/useSpecies';
import { PokemonResponse } from '../types';
import PokemonInfo from '../components/PokemonInfo';
import About from '../components/About';
import Stats from '../components/Stats';
import Evolution from '../components/Evolution';

type Params = {
  id: string;
};

type Tab = 'about' | 'stats' | 'evolution';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

export default function PokemonDetail(): JSX.Element {
  const { id = '' } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>('about');

  const pokemon = UsePokemon<PokemonResponse>(id);
  const species = UseSpecies(id);

  const { types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      //name: pokemon.data?.data.name,
      types: pokemon.data?.data.types,
      height: pokemon.data?.data.height,
      weight: pokemon.data?.data.weight,
      abilities: pokemon.data?.data.abilities,
      baseExp: pokemon.data?.data.base_experience,
      stats: pokemon.data?.data.stats,
    }),
    [pokemon]
  );

  const {
    name = '',
    color,
    growthRate,
    flavorText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      name: species.data?.data.names[2].name,
      color: species.data?.data.color,
      growthRate: species.data?.data.growth_rate.name,
      flavorText: species.data?.data.flavor_text_entries,
      // flavorText: `${species.data?.data.flavor_text_entries[23].flavor_text}
      //   ${species.data?.data.flavor_text_entries[31].flavor_text}
      //   `,
      genderRate: species.data?.data.gender_rate,
      isLegendary: species.data?.data.is_legendary,
      isMythical: species.data?.data.is_mythical,
      evolutionChainUrl: species.data?.data.evolution_chain.url,
    }),
    [species]
  );

  const handleClick = (tab: Tab) => setSelectedTab(tab);
  return (
    <Container>
      <PokemonInfo id={id} name={name} types={types} color={color} />
      <TabsWrapper>
        <TabList color={color} tab={selectedTab} onClick={handleClick} />
      </TabsWrapper>
      {selectedTab === 'about' && (
        <About
          isLoading={pokemon.isLoading || species.isLoading}
          color={color}
          growthRate={growthRate}
          flavorText={flavorText}
          genderRate={genderRate}
          isLegendary={isLegendary}
          isMythical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilities={abilities}
        />
      )}
      {selectedTab === 'stats' && (
        <Stats
          isLoading={pokemon.isLoading || species.isLoading}
          color={color}
          stats={stats}
        />
      )}
      {selectedTab === 'evolution' && (
        <Evolution name={name} color={color} url={evolutionChainUrl} />
        // <Evolution
        //   id={id}
        //   isLoading={species.isLoading}
        //   color={color}
        //   url={evolutionChainUrl}
        // />
      )}
    </Container>
  );
}
