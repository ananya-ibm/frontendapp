/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './PredefinedBundle.styles';

export const PredefinedBundle = ({ travelPackage, className }: Props) => {
  return (
    <S.PredefinedBundle className={className}>
      <S.PredefinedBundleData>
        1x {travelPackage.name}
        <span>
          {travelPackage.priceCurrency}
          {travelPackage.priceValue}
        </span>
      </S.PredefinedBundleData>
      <S.PredefinedBundleContent>
        {travelPackage.options?.map(option => (
          <div key={`predefined-bundle-${option.ID}`}>1x {option.name}</div>
        ))}
      </S.PredefinedBundleContent>
    </S.PredefinedBundle>
  );
};

type Props = {
  travelPackage: {
    name: string;
    priceCurrency: string;
    priceValue: string | number;
    options?: {
      name?: string;
      ID: string;
    }[];
  };
  className?: string;
};