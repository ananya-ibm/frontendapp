/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './MenuCloseButton.styles';

export const MenuCloseButton = ({ isOpen, setMenuOpen = () => {} }: Props) => {
  return (
    <S.Button
      className="menu-button hover-header"
      onClick={() => {
        setMenuOpen(!isOpen);
      }}
    >
      <svg
        className="menu-button-icon"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        viewBox="0 0 50 50"
        fill="none"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOpen ? (
          <>
            <span className="sr">Menu Close</span>
            <path d="M10 10l30 30M40 10L10 40" />
          </>
        ) : (
          <>
            <span className="sr">Menu Open</span>
            <path d="M10 40h30M10 25h30M10 10h30" />
          </>
        )}
      </svg>
    </S.Button>
  );
};

type Props = {
  isOpen?: boolean;
  setMenuOpen?: (state: boolean) => void;
};
