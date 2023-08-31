/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import * as S from '../Tiles.styles';

type Props = {
  location: string;
  mainAirport: string;
};

export const CityTile = ({ location, mainAirport }: Props) => {
  return (
    <S.ClickTile>
      <S.PlaneIcon />
      <S.Info>
        <S.TopInfo>
          <span>{location}</span>
        </S.TopInfo>
        <S.BottomInfo>All airports</S.BottomInfo>
      </S.Info>
      <S.IATA>{mainAirport}</S.IATA>
    </S.ClickTile>
  );
};
// export const CityTile = ({city, country, mainAirport}: Props) => {
//     return (
//         <S.ClickTile>
//           <S.City>
//             <S.PlaneIcon />
//             <S.Info>
//               <S.TopInfo>
//                 <span>{city}</span>
//                 <span>, </span>
//                 <span>{country}</span>
//               </S.TopInfo>
//               <S.BottomInfo>All airports</S.BottomInfo>
//             </S.Info>
//             <S.IATA>{mainAirport}</S.IATA>
//           </S.City>
//         </S.ClickTile>
//     );
// }
