/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const Bag = ({ width = '20px', fill = 'currentColor' }: Props) => (
  <svg width={width} viewBox="0 0 16 20">
    <g fill="none" fillRule="evenodd">
      <path d="M-4-2h24v24H-4z" />
      <path
        d="M4 4a4 4 0 118 0h3l.8 12.813A3 3 0 0112.808 20H3.193A3 3 0 01.2 16.813L1 4h3zm2 0h4a2 2 0 10-4 0zM2.195 16.938A1 1 0 003.193 18h9.614a1 1 0 00.998-1.062L13.12 6H2.88l-.684 10.938z"
        fill={fill}
      />
    </g>
  </svg>
);

type Props = {
  fill?: string;
  width?: string;
};
