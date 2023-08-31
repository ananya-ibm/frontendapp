/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useSessionContext } from '@exo/frontend-common-session-context';
import { Ancillary, AncillaryPackage } from '@exo/frontend-features-travel-ancillary-page-logic';
import React, { useCallback, useEffect, useState } from 'react';
import { iconChoose } from '../../utils/utils';
import { FareBundleHeader } from '../FareBundleHeader/FareBundleHeader';
import { TravelPackageTile } from '../Tiles/TravelPackageTile/TravelPackageTile';
import { useCart } from '@exo/frontend-features-travel-checkout-page-logic';
import * as S from './FareBundleCard.styles';
import { useHistory } from 'react-router-dom';

export const FareBundleCard = ({ ancillaryPackage, ancillaries, currency }: Props) => {
  const session = useSessionContext();
  const cart = useCart();
  const history = useHistory();
  const addressId = 'YndCYqto';
  const [tiles, setTiles] = useState<JSX.Element[]>();

  //Function for mapping a package option in order to return an array of those options
  const mapPackageOptions = (options?: string[]) => {
    const travelPackageOptions = options?.map(option => {
      const optionObj = ancillaries?.find(ancillary => ancillary.ID === option);
      return { ID: option, name: optionObj?.name };
    });
    return travelPackageOptions;
  };

  //Function for getting the total ancillary package price
  const mapPackagePrice = useCallback(
    (options?: string[]) => {
      const prices = options?.map(option => {
        const optionObj = ancillaries?.find(ancillary => ancillary.ID === option);
        return optionObj?.price.value;
      });
      const reducer = (acc, curr) => acc + curr;
      return prices?.reduce(reducer);
    },
    [ancillaries]
  );

  const handleSelectPack = async (travelPack: AncillaryPackage) => {
    if (travelPack) {
      const newSelectedTravelPackage = {
        name: travelPack.name,
        ID: travelPack.CTID,
        priceValue: Number(mapPackagePrice(travelPack?.options)),
        priceCurrency: currency,
        options: mapPackageOptions(travelPack.options)
      };
      session.set({
        ...session,
        selectedTravelPackage: newSelectedTravelPackage,
        selectedAncillaries: null
      });
      if (newSelectedTravelPackage) {
        const selectedTravelPackageForCart = {
          id: newSelectedTravelPackage.ID,
          quantity: 1
        };
        const add = await cart.add(session.cartId, selectedTravelPackageForCart);
        if(add) {
          const updateAddress = await cart.update(session.cartId, addressId);
           if(updateAddress) history.push('/travel/express-checkout');
        }
      }
      
    }
  };

  useEffect(() => {
    const map: JSX.Element[] = [];

    // Function for getting every ancillary package option name using its ID
    const mapPackageName = (id: string) => {
      const travelPackage = ancillaries?.filter(ancillary => ancillary.ID === id);
      const packageName = travelPackage ? travelPackage[0]?.name : '';
      return packageName;
    };

    ancillaryPackage?.options.map(option => {
      map.push(
        <TravelPackageTile
          key={option}
          icon={iconChoose(mapPackageName(option))}
          name={mapPackageName(option)}
        />
      );
    });
    setTiles(map);
  }, [ancillaryPackage]);

  return (
    <S.BundleWrapper>
      <FareBundleHeader
        title={ancillaryPackage?.name}
        description={ancillaryPackage?.description}
        price={mapPackagePrice(ancillaryPackage?.options)}
        currency={currency}
        handleSelectPack={handleSelectPack}
        travelPack={ancillaryPackage}
      />
      {tiles}
    </S.BundleWrapper>
  );
};

type Props = {
  ancillaryPackage?: AncillaryPackage;
  ancillaries?: Ancillary[];
  currency: string;
};