/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const User = ({ width = '16px', fill = '#000' }: Props) => (
  <svg width={width} viewBox="0 0 16 16">
    <defs>
      <path
        d="M12,4 C9.79,4 8,5.79 8,8 C8,10.21 9.79,12 12,12 C14.21,12 16,10.21 16,8 C16,5.79 14.21,4 12,4 L12,4 Z M12,14 C9.33,14 4,15.34 4,18 L4,20 L20,20 L20,18 C20,15.33 14.67,14 12,14 L12,14 Z"
        id="user-path"
      />
    </defs>

    <g transform="translate(-4.000000, -4.000000)">
      <mask fill="white">
        <use xlinkHref="#user-path" />
      </mask>
      <use fill={fill} xlinkHref="#user-path" />
    </g>
  </svg>
);

type Props = {
  fill?: string;
  width?: string;
};
