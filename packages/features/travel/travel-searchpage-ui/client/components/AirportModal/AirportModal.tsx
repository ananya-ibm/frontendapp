/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIATA } from '@exo/frontend-features-travel-searchpage-logic';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { AirportTile } from '../Tiles/AirportTile/AirportTile';
import { CityTile } from '../Tiles/CityTile/CityTile';
import * as S from './AirportModal.styles';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useEffectOnce } from '@exo/frontend-common-hooks';

export const AirportModal = React.memo(
  ({ isOpen, title, placeholder, closeModal, setAirport, usePreferences }: Props) => {
    const { flightPreferences } = useSessionContext();
    const { getIATA, loading, data: queryResult } = useIATA();

    const [searchInfo, setSearchInfo] = useState<string>('');
    const [data, setData] = useState<typeof queryResult>([]);

    const [delayTimer, setDelayTimer] = useState<any>();
    const [formattedAirports, setFormattedAirports] = useState<FormattedAirports>({});
    const [airportTiles, setAirportTiles] = useState<any>([]);

    const searchIATADelay = useCallback(() => {
      clearTimeout(delayTimer);
      const timer = setTimeout(() => {
        if (searchInfo) {
          getIATA({ variables: { searchTerm: searchInfo } });
        }
      }, 1000);
      setDelayTimer(timer);
    }, [delayTimer]);

    const capitalizeAllWords = useCallback(
      (sentence: string) =>
        sentence
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
          .join(' '),
      []
    );

    const mapAirportCities = useCallback((city: string, country: string) => {
      const fCity = city
        .split(' ')
        .map(word => capitalizeAllWords(word.toLowerCase()))
        .join(' ');
      const fCountry = country
        .split(' ')
        .map(word => capitalizeAllWords(word.toLowerCase()))
        .join(' ');
      return `${fCity}, ${fCountry}`;
    }, []);

    const mapCities = useCallback(
      (IATAs: IataEntry[]) => {
        const airportMaps: FormattedAirports = {};
        if (IATAs) {
          IATAs.forEach(iataEntry => {
            const location = mapAirportCities(
              iataEntry.address.cityName,
              iataEntry.address.countryName
            );
            if (!Object.prototype.hasOwnProperty.call(airportMaps, location)) {
              airportMaps[location] = [
                { iata: iataEntry.iataCode, name: capitalizeAllWords(iataEntry.name.toLowerCase()) }
              ];
            } else {
              airportMaps[location].push({
                iata: iataEntry.iataCode,
                name: capitalizeAllWords(iataEntry.name.toLowerCase())
              });
            }
          });
        }
        return airportMaps;
      },
      [mapAirportCities]
    );

    useEffect(() => {
      if (queryResult) {
        setData(queryResult);
      }
    }, [queryResult]);

    useEffect(() => {
      if (data !== undefined) {
        setFormattedAirports(mapCities(data.IATAcode));
      }
    }, [data]);

    useEffectOnce(() => {
      if (flightPreferences && !!flightPreferences.PreferredAirportCode && usePreferences) {
        getIATA({ variables: { searchTerm: flightPreferences.PreferredAirportCode } });
      }
    });

    useEffect(() => {
      const airportMap: JSX.Element[] = [];
      for (const location in formattedAirports) {
        if (Object.prototype.hasOwnProperty.call(formattedAirports, location)) {
          airportMap.push(
            <CityTile
              location={location}
              mainAirport={formattedAirports[location][0].iata}
              key={`airportModal-cityTile-${location}`}
            />
          );
          formattedAirports[location].forEach((fAirport: { name: string; iata: string }) => {
            airportMap.push(
              <AirportTile
                isStarred={
                  usePreferences && flightPreferences?.PreferredAirportCode === fAirport.iata
                }
                location={location}
                iataCode={fAirport.iata}
                airport={fAirport.name}
                key={`airportModal-airportTile-${fAirport.name}-${fAirport.iata}`}
                onClick={() => {
                  const airport = { iata: fAirport.iata, name: fAirport.name, location: location };
                  setAirport(airport);
                  closeModal();
                }}
              />
            );
          });
        }
      }
      setAirportTiles(airportMap);
    }, [formattedAirports]);

    useEffect(() => {
      setData([]);
      if (searchInfo) {
        searchIATADelay();
      }
      return () => clearTimeout(delayTimer);
    }, [searchInfo]);

    const cancel = useCallback(() => {
      setFormattedAirports({});
      setSearchInfo('');
      closeModal();
    }, [closeModal]);

    return (
      <S.StyledModal
        isOpen={isOpen}
        onClose={cancel}
        isScrollable={true}
        buttons={[
          { onClick: () => {}, label: '', disabled: true },
          { onClick: cancel, label: 'Cancel', disabled: false }
        ]}
      >
        <S.ModalContent>
          <S.Title>{title}</S.Title>
          <S.AirportSearch
            labelText=""
            placeholder={placeholder}
            id="search-1"
            name="search-location"
            hideLabel={true}
            onChange={e => setSearchInfo(e.target.value)}
            type="search"
            value={searchInfo}
            autoFocus
          />
          {loading && <S.LoadingIndicator type="inline" />}
          {airportTiles}
        </S.ModalContent>
      </S.StyledModal>
    );
  }
);

type IataEntry = {
  iataCode: string;
  geoData?: {
    latitude?: string;
    longitude?: string;
  };
  type?: string;
  subType?: string;
  name: string;
  detailedName?: string;
  timeZoneOffset?: string;
  locationScore?: {
    travelers?: {
      score: string;
    };
  };
  address: {
    cityName: string;
    cityCode?: string;
    countryName: string;
    countryCode?: string;
  };
};

export type Airport = {
  name: string;
  location: string;
  iata: string;
};

type Props = {
  isOpen: boolean;
  title: 'From where?' | 'To where?';
  closeModal: () => void;
  setAirport: Dispatch<SetStateAction<Airport>>;
  usePreferences: boolean;
  placeholder: string;
};

type FormattedAirports = {
  [location: string]: {
    name: string;
    iata: string;
  }[];
};