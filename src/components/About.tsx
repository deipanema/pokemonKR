import styled from '@emotion/styled/macro';
import { Ability, Color, FlavorTextEntry, Type } from '../types';
import { mapTypeToHex } from '../utils';
import Abilities from './Abilities';
import PokedexData from './PokedexData';

type Props = {
  isLoading: boolean;
  color?: Color;
  growthRate?: string;
  flavorText?: Array<FlavorTextEntry>;
  //flavorText?: string;
  genderRate?: number;
  isLegendary?: boolean;
  isMythical?: boolean;
  types?: Array<Type>;
  weight?: number;
  height?: number;
  baseExp?: number;
  abilities?: Array<Ability>;
};

const Base = styled.article`
  padding: 20px;
`;

const FlavorText = styled.p`
  margin: 0 auto;
  word-break: break-word;
  font-size: 14px;
  color: #374151;
`;

const TypeWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const TypeList = styled.div`
  display: flex;
  margin-top: 8px;
  ${TypeWrapper} + ${TypeWrapper} {
    margin-left: 8px;
  }
`;

const TypeImage = styled.img`
  height: 12px;
`;

const TypeLabel = styled.span`
  margin-left: 4px;
  color: #fff;
  font-size: 10px;
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

export default function About({
  isLoading,
  isMythical,
  isLegendary,
  types,
  weight,
  flavorText,
  growthRate,
  genderRate,
  color,
  height,
  baseExp,
  abilities,
}: Props): JSX.Element {
  const rarity = isLegendary ? 'Legendary' : isMythical ? 'Mythical' : 'Normal';

  const flavorTextArr = flavorText
    ?.filter((text) => text.language.url.match(/\/3\/$/))
    .filter((_, idx) => idx % 2 === 1);

  return (
    <Base>
      {/* <FlavorText>{flavorText}</FlavorText> */}
      {flavorTextArr?.map((text, idx) => (
        <FlavorText key={idx}>{text.flavor_text}</FlavorText>
      ))}
      {isLoading ? (
        <ImageWrapper>
          <Image src='/assets/loading.gif' alt='loading...' />
        </ImageWrapper>
      ) : (
        <>
          {types && (
            <TypeList>
              {types.map(({ type }, idx) => (
                <TypeWrapper key={idx} color={mapTypeToHex(type.name)}>
                  <TypeImage src={`/assets/${type.name}.svg`} />
                  <TypeLabel>{type.name.toUpperCase()}</TypeLabel>
                </TypeWrapper>
              ))}
            </TypeList>
          )}
          <PokedexData
            weight={weight}
            height={height}
            genderRate={genderRate}
            growthRate={growthRate}
            baseExp={baseExp}
            rarity={rarity}
            color={color}
          />
          {abilities && <Abilities abilities={abilities} color={color} />}
        </>
      )}
    </Base>
  );
}
