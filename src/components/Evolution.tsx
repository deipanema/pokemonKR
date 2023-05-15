import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import useEvolutionChain from '../hooks/useEvolutionChain';
import { Color, Chain } from '../types';
import { mapColorToHex } from '../utils';
import EvolutionStage from './EvolutionStage';

type Props = {
  name?: string;
  color?: Color;
  url?: string;
};

const Base = styled.div`
  margin-top: 32px;
  padding: 0 20px 20px;
`;

const Title = styled.h4<{ color: string }>`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const List = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
  > li + li {
    margin-top: 24px;
  }
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 444px);
`;

const Empty = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`;

export default function Evolution({ name, url, color }: Props): JSX.Element {
  const [evolutionChains, setEvolutionChains] = useState<
    Array<{
      from: { name: string; url: string };
      to: { name: string; url: string };
      level: number;
    }>
  >([]);

  const { isSuccess, isError, isLoading, data } = useEvolutionChain(url);

  useEffect(() => {
    const makeEvolutionChain = (chain: Chain) => {
      if (chain.evolves_to.length) {
        const [evolvesTo] = chain.evolves_to;

        const from = chain.species;
        const to = evolvesTo.species;
        const level = evolvesTo.evolution_details[0].min_level;

        setEvolutionChains((prev) => [...prev, { from, to, level }]);

        makeEvolutionChain(chain.evolves_to[0]);
      }
    };

    isSuccess && data && makeEvolutionChain(data.data.chain);

    return (): void => {
      setEvolutionChains([]);
    };
  }, [isSuccess, data]);

  return (
    <Base>
      <Title color={mapColorToHex(color?.name)}>Evolution</Title>
      {isLoading || isError ? (
        <ImageWrapper>
          <Image src='/assets/loading.gif' />
        </ImageWrapper>
      ) : evolutionChains.length ? (
        <List>
          {evolutionChains.map(({ from, to, level }, idx) => (
            <EvolutionStage
              key={idx}
              from={from}
              to={to}
              level={level}
              color={color}
            />
          ))}
        </List>
      ) : (
        <EmptyWrapper>
          <Empty color={mapColorToHex(color?.name)}>
            {name}은(는) 진화하지 않습니다.
          </Empty>
        </EmptyWrapper>
      )}
    </Base>
  );
}
