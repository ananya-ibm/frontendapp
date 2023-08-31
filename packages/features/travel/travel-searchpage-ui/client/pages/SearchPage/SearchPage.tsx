/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved
US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useCallback, useMemo, useState } from 'react';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { useAuthentication } from '@exo/frontend-features-authentication-logic';
import * as S from './SearchPage.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';
import { FlightAirport } from '../../components/FlightAirport/FlightAirport';
import { FlightDate } from '../../components/FlightDate/FlightDate';
import { FlightClass } from '../../components/FlightClass/FlightClass';
import { FlightPassenger } from '../../components/FlightPassenger/FlightPassenger';
import { FlightAdmin } from '../../components/FlightAdmin/FlightAdmin';
import { FlightPreferences } from '../../components/FlightPreferences/FlightPreferences';
import { FlightExtras } from '../../components/FlightExtras/FlightExtras';
import { Airport } from '../../components/AirportModal/AirportModal';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useHistory } from 'react-router-dom';
import { Button } from '@exo/frontend-components-base';
import { FlightToggle } from '../../components/FlightToggle/FlightToggle';
import { useFlightPreferences } from '@exo/frontend-features-travel-searchpage-logic';
import {
  Menu
} from '@carbon/react/icons';

import logo from "./Vector.png"

// ToDo: There is a bug where CMS container should in fact not be used like this, it should wrap the whole page and use CMSSpot
export const SearchPage = React.memo(() => {
  const eventContext = useEventContext();
  const { authenticate } = useAuthentication();
  const session = useSessionContext();
  const { token } = session;
  const history = useHistory();
  const { getFlightPreferences } = useFlightPreferences();

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Search page' });
    // TODO - replace env with email of logged in user
    getFlightPreferences({ variables: { email: process.env.TRAVEL_PREFERENCE_EMAIL } });
  });

  const initialStates = useMemo(
    () => ({
      from: {
        name: session.flightInfo?.originAirportName ? session.flightInfo?.originAirportName : '',
        location:
          session.flightInfo?.originLocationCity && session.flightInfo?.originLocationCountry
            ? `${session.flightInfo?.originLocationCity}, ${session.flightInfo?.originLocationCountry}`
            : '',
        iata: session.flightInfo?.originLocationCode ? session.flightInfo?.originLocationCode : ''
      },
      to: {
        name: session.flightInfo?.destinationAirportName
          ? session.flightInfo?.destinationAirportName
          : '',
        location:
          session.flightInfo?.destinationLocationCity &&
          session.flightInfo?.destinationLocationCountry
            ? `${session.flightInfo?.destinationLocationCity}, ${session.flightInfo?.destinationLocationCountry}`
            : '',
        iata: session.flightInfo?.destinationLocationCode
          ? session.flightInfo?.destinationLocationCode
          : ''
      },
      passengers: session.flightInfo?.passengerCount ? session.flightInfo?.passengerCount : 0,
      dateDeparture: session.flightInfo?.departureDate ? session.flightInfo?.departureDate : null,
      dateReturn: session.flightInfo?.returnDate ? session.flightInfo?.returnDate : null,
      travelClasses:
        session.flightInfo?.travelClass && session.flightInfo?.travelClass.length !== 0
          ? session.flightInfo?.travelClass
          : [],
      setTravelClassesString: session.flightInfo?.travelClassesString
        ? session.flightInfo?.travelClassesString
        : ''
    }),
    [session]
  );

  const [from, setFrom] = useState<Airport>(initialStates.from);
  const [to, setTo] = useState<Airport>(initialStates.to);
  const [passengers, setPassengers] = useState<number>(initialStates.passengers);
  const [travelClasses, setTravelClasses] = useState<string[]>(initialStates.travelClasses);
  const [travelClassesString, setTravelClassesString] = useState<string>(
    initialStates.setTravelClassesString
  );
  const [dateDeparture, setDateDeparture] = useState<string | null>(initialStates.dateDeparture);
  const [dateReturn, setDateReturn] = useState<string | null>(initialStates.dateReturn);
  const [isOneWayToggled, setIsOneWayToggled] = useState<boolean>(false);
  const [usePreferences, setUsePreferences] = useState<boolean>(false);

  const getFlights = useCallback(() => {
    const flightInfo = {
      originLocationCode: from.iata,
      originLocationCity: from.location.split(', ')[0],
      originLocationCountry: from.location.split(', ')[1],
      originAirportName: from.name,
      destinationLocationCode: to.iata,
      destinationLocationCity: to.location.split(', ')[0],
      destinationLocationCountry: to.location.split(', ')[1],
      destinationAirportName: to.name,
      departureDate: dateDeparture,
      returnDate: isOneWayToggled ? null : dateReturn,
      passengerCount: passengers,
      travelClass: travelClasses,
      travelClassesString: travelClassesString,
      directFlightOnly: true,
      usePreferences
    };
    session.set({ ...session, flightInfo });
    history.push('/travel/travel-flights');
  }, [
    from,
    to,
    dateDeparture,
    isOneWayToggled,
    dateReturn,
    passengers,
    travelClasses,
    travelClassesString,
    usePreferences
  ]);

  return (
    <div style={{width:"400px",margin:"auto",position:"relative",height:"80vh"}}>
      <div style={{backgroundColor:"#f8ce07",height:"100px",width:"100%",display:"flex"}}>
        <Menu size={26} style={{marginTop:"30px"}}/>
        <img src={logo} style={{margin:"auto", width:"40px"}}/>
      </div>
      <div style={{position:"absolute",backgroundColor:"black",bottom:0,width:"100%",height:"50px"}}></div>
    </div>
  );
});