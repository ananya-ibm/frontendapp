/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const Search = ({ width = '16px', fill = 'currentColor' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    viewBox="0 0 50 50"
    fill="none"
    stroke={fill}
    strokeWidth="4"
    strokeLinecap="round"
  >
    <circle cx="20" cy="20" r="15" />
    <path d="M45 45L31 31" />
  </svg>
);

type Props = {
  fill?: string;
  width?: string;
};
