/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Ancillary, SelectedAncillary } from '@exo/frontend-features-travel-ancillary-page-logic';
import * as S from './CustomBundleCard.styles';
import { CustomAncillaryTile } from '../Tiles/CustomAncillaryTile/CustomAncillaryTile';
import { currencyMap, iconChoose } from '../../utils/utils';
import { FareBundleHeader } from '../FareBundleHeader/FareBundleHeader';

export const CustomBundleCard = React.memo(
  ({ ancillaries, currency, selectedAncillaries, setSelectedAncillaries, handleSelectCustom }: Props) => {
    const [tiles, setTiles] = useState<JSX.Element[]>();
    const [price, setPrice] = useState<number>(0);

    const selectCustomAncillary = useCallback(
      ({ name, ID, priceValue, priceCurrency }: SelectedAncillary) => {
        setSelectedAncillaries(prev => {
          const newSelectedAncillaries = JSON.parse(JSON.stringify(prev));
          if (!newSelectedAncillaries.some((e: SelectedAncillary) => e.ID === ID)) {
            newSelectedAncillaries.push({ name, ID, priceValue, priceCurrency });
          } else {
            const index = newSelectedAncillaries.findIndex((e: SelectedAncillary) => e.ID === ID);
            newSelectedAncillaries.splice(index, 1);
          }
          return newSelectedAncillaries;
        });
      },
      []
    );

    useEffect(() => {
      if (selectedAncillaries.length > 0) {
        const totalPrice = selectedAncillaries.reduce(
          (prev, current) => prev + current.priceValue,
          0
        );
        setPrice(totalPrice);
      } else {
        setPrice(0);
      }
    }, [selectedAncillaries]);

    useEffect(() => {
      const map: JSX.Element[] = [];

      /**
       * Used the slice method because of BE reasons
       * Only the first 7 objects are ancillaries,the rest are extras
       */

      ancillaries?.slice(0, 6).map(ancillary => {
        map.push(
          <CustomAncillaryTile
            key={ancillary.ID}
            icon={iconChoose(ancillary.name)}
            name={ancillary.name}
            isSelected={selectedAncillaries.some((e: SelectedAncillary) => e.ID === ancillary.ID)}
            onSelect={() => {
              selectCustomAncillary({
                name: ancillary.name,
                ID: ancillary.CTID,
                priceValue: ancillary.price.value,
                priceCurrency: ancillary.price.currency
              });
            }}
            price={`+${ancillary.price.value} ${currencyMap[ancillary.price.currency]}`}
          />
        );
      });

      setTiles(map);
    }, [ancillaries]);

    return (
      <S.BundleWrapper>
        <FareBundleHeader
          title={'Custom bundle'}
          description={'Offer based on your preferences'}
          price={price}
          currency={currency}
          handleSelectCustom={handleSelectCustom}
        />
        {tiles}
      </S.BundleWrapper>
    );
  }
);

type Props = {
  ancillaries?: Ancillary[];
  currency: string;
  selectedAncillaries: any[];
  setSelectedAncillaries: Dispatch<SetStateAction<any[]>>;
  handleSelectCustom: () => void;
};