/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './FlightJourneyIcon.styles';

export const FlightJourneyIcon = () => {
  return (
    <S.JourneyIcon>
      <S.CircleFill />
      <S.DashedLine />
      <S.Plane />
      <S.DashedLine />
      <S.CircleEmpty />
    </S.JourneyIcon>
  );
};
