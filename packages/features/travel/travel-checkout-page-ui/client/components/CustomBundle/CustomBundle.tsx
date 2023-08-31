/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './CustomBundle.styles';
import { currencyMap } from '../../utils/utils';

export const CustomBundle = ({ selectedAncillaries }: Props) => {
  return (
    <S.CustomBundle>
      {selectedAncillaries?.map(a => (
        <S.Ancillary>
          1x {a.name}
          <div>
            {currencyMap[a.priceCurrency]}
            {a.priceValue}
          </div>
        </S.Ancillary>
      ))}
    </S.CustomBundle>
  );
};

type Props = {
  selectedAncillaries?: {
    name: string;
    ID: string;
    priceValue: number;
    priceCurrency: string;
  }[];
};