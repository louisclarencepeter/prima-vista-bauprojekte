import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import WohnungSanierungBoard from './WohnungSanierungBoard';
import {
  WOHNUNG_TYPES,
  type WohnungType,
} from '../../data/wohnungSanierung';

type Props = {
  embedded?: boolean;
};

export default function WohnungSanierungConfigurator({ embedded }: Props) {
  const [wohnungType, setWohnungType] = useState<WohnungType>('2zi');
  
  const defaultAreas: Record<WohnungType, number> = {
    'studio': 50,
    '2zi': 100,
    '3zi': 150,
    'maisonette': 150
  };
  
  const [area, setArea] = useState<number>(defaultAreas['2zi']);

  const selectedType = WOHNUNG_TYPES.find((type) => type.value === wohnungType);

  function changeWohnungType(value: WohnungType) {
    setWohnungType(value);
    // Automatically adjust the area to match the typical size of the new type
    setArea(defaultAreas[value] || 100);
  }

  return (
    <div className={`kalkulator__inner kalkulator__inner--stack${embedded ? ' kalk-embed' : ''}`}>
      <WohnungSanierungBoard
        wohnungType={wohnungType}
        onWohnungTypeChange={changeWohnungType}
      />

      <RenovationCalculator
        packageId={wohnungType}
        embedded
        livingArea={area}
        onLivingAreaChange={setArea}
        kindLabel={selectedType?.label ?? 'Wohnungs-Sanierung'}
      />
    </div>
  );
}
