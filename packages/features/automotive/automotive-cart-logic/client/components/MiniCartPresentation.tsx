/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import * as S from './MiniCartPresentation.styles';

export const MiniCartPresentation = ({ count = 0, currentColor = '#000' }: Props) => {
  return (
    <S.MiniCartPresentation to="/cart/cart">
      {count > 0 && <S.CartCount>{count}</S.CartCount>}
      <S.Icon viewBox="0 0 50 50" stroke={currentColor} strokeWidth="2" fill={currentColor}>
        <path
          fill="none"
          d="M42.1 23s-2.6-5.4-4.2-8.3c-1.6-2.9-6.5-3.1-12.9-3.1s-11.3.2-12.9 3L8 23"
        />
        <path d="M47 31.7c-.3 3.8.3 8.6-8 7.5S28.6 38 25 38s-5.5 0-14 1-7.7-3.6-7.9-7.4C3 28 4.3 24.3 6.1 23s11.2-1.8 19-1.8 17.1.5 18.9 1.8 3.2 5 3 8.7zM8 22l-1-2s-4.6-.4-4 1c.5 1 4 1 4 1m36 0s3.5 0 4-1c.6-1.4-4-1-4-1l-1 2" />
        <rect x="4" y="33" width="7" height="9" rx="1.2" />
        <rect x="39" y="33" width="7" height="9" rx="1.2" />
        <g fill="#333" stroke="none">
          <path d="M43 32h-5c-.6-1.2.2-1.8 1-2 1-.3 6-1 6-1s.6 3-2 3zM7 32h5c.6-1.2-.2-1.8-1-2-1-.3-6-1-6-1s-.6 3 2 3z" />
          <rect x="7" y="35" width="5" height="1" rx="1" />
          <rect x="38" y="35" width="5" height="1" rx="1" />
        </g>
      </S.Icon>
    </S.MiniCartPresentation>
  );
};

type Props = {
  count?: number;
  currentColor?: string;
};
