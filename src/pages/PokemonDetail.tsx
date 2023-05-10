import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TabList from '../components/TabList';

type Params = {
  pokemonId: string;
};

type Tab = 'about' | 'stats' | 'evolution';

export default function PokemonDetail(): JSX.Element {
  const { pokemonId } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>('about');
  const handleClick = (tab: Tab) => setSelectedTab(tab);
  return (
    <div>
      <TabList tab={selectedTab} onClick={handleClick} />
    </div>
  );
}
