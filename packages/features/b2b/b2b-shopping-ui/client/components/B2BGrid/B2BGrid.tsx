/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './B2BGrid.styles';

export const B2BGrid = ({ children }: { children?: any }) => {
  return (
    <S.OuterWrapper>
      <S.InnerWrapper>{children}</S.InnerWrapper>
    </S.OuterWrapper>
  );
};
