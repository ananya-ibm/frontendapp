/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import * as S from './AncillaryPage.styles';
import { useEventContext } from '@exo/frontend-features-events-logic';
import {
  AncillaryPackage,
  useAncillary,
  SelectedAncillary
} from '@exo/frontend-features-travel-ancillary-page-logic';
import { useEffectOnce } from '@exo/frontend-common-hooks';
import { FlightDetails } from '@exo/frontend-components-travel';
import { CustomBundleCard } from '../../components/CustomBundleCard/CustomBundleCard';
import { FareBundleCard } from '../../components/FareBundleCard/FareBundleCard';
import { Ancillary } from '@exo/frontend-features-travel-ancillary-page-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useCart } from '@exo/frontend-features-travel-checkout-page-logic';
import { useHistory } from 'react-router-dom';
import { currencyMap } from '../../utils/utils';

export const AncillaryPage = ({}: Props) => {
  const eventContext = useEventContext();
  const cart = useCart();
  const addressId = 'YndCYqto';
  const session = useSessionContext();
  const { selectedFlight } = session;
  const history = useHistory();
  const { flightInfo } = useSessionContext();
  const { getAncillary, data: queryResult } = useAncillary();
  const [data, setData] = useState<typeof queryResult>([]);
  const [currency, setCurrency] = useState<string>('EUR');
  const [ancillaries, setAncillaries] = useState<Ancillary[]>();
  const [ancillariesPackages, setAncillariesPackages] = useState<AncillaryPackage[]>();
  const [selectedAncillaries, setSelectedAncillaries] = useState<any[]>([]);

  useEffect(() => {
    getAncillary({ variables: { userEmail: process.env.TRAVEL_PREFERENCE_EMAIL } });
    if (queryResult) {
      setData(queryResult);
    }
    if (data?.presentAncillariesOptions?.length > 0) {
      setAncillaries(data?.presentAncillariesOptions[0]?.ancillaries);
      setAncillariesPackages(data?.presentAncillariesOptions[0]?.ancillariesPackages);
    }
  }, [queryResult, data]);

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Ancillary page' });
  });

  useEffect(() => ancillaries && setCurrency(ancillaries[0].price.currency), [ancillaries]); // TODO - maybe fetch the currency some

  const handleSelectCustom = async () => {
    session.set({ ...session, selectedAncillaries, selectedTravelPackage: null });
    await cart.update(session.cartId, addressId);

    let selectedAncillariesForCart;
    if (selectedAncillaries.length > 0) {
      selectedAncillariesForCart = selectedAncillaries?.map((selection: SelectedAncillary) => {
        return {
          id: selection.ID,
          quantity: 1
        };
      });
    }

    const add = await cart.add(session.cartId, selectedAncillariesForCart);
    if(add) history.push('/travel/express-checkout');
  };

  return (
    <>
      {flightInfo && selectedFlight && (
        <FlightDetails
          departureAirport={`${flightInfo.originLocationCity}, ${flightInfo.originLocationCode}`}
          arrivalAirport={`${flightInfo.destinationLocationCity}, ${flightInfo.destinationLocationCode}`}
          flightClasses={flightInfo.travelClassesString}
          noOfPassengers={flightInfo.passengerCount}
          departureDate={flightInfo.departureDate}
          returnDate={flightInfo.returnDate}
          leavingFlight={selectedFlight.leavingFlight}
          returningFlight={selectedFlight.returningFlight}
          price={selectedFlight.price}
          isAncillaryPage={true}
        />
      )}

      <S.AncillaryPage>
        <S.Bundles>
          <S.BundlesContainer>
            <CustomBundleCard
              ancillaries={ancillaries}
              selectedAncillaries={selectedAncillaries}
              setSelectedAncillaries={setSelectedAncillaries}
              currency={currencyMap[currency]}
              handleSelectCustom={handleSelectCustom}
            />
            {ancillariesPackages?.map(ancillaryPackage => (
              <FareBundleCard
                key={ancillaryPackage?.ID}
                ancillaryPackage={ancillaryPackage}
                ancillaries={ancillaries}
                currency={currencyMap[currency]}
              />
            ))}
          </S.BundlesContainer>
        </S.Bundles>
      </S.AncillaryPage>
    </>
  );
};

type Props = {};

export type Flight = {
  flightNo: string;
  flightDetails: string;
  departure: {
    time: string;
    airport: string;
  };
  arrival: {
    time: string;
    airport: string;
  };
  flightDuration: string;
};

export type FlightFromCT = {
  flightNo: string;
  flightDetails: string;
  departure: {
    time: string;
    airport: string;
  };
  arrival: {
    time: string;
    airport: string;
  };
  flightDuration: string;
};