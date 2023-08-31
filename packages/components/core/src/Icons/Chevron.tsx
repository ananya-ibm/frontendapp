/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const Chevron = ({ width = '24px', fill = 'currentColor' }: Props) => (
  <svg width={width} viewBox="0 0 24 24">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <rect x="0" y="0" width={width} height={width} />
        <path
          d="M14.6829313,12.0000091 L9.24075246,5.65080044 C8.88133031,5.2314746 8.92989185,4.60017461 9.34921769,4.24075246 C9.76854353,3.88133031 10.3998435,3.92989185 10.7592657,4.34921769 L16.7592657,11.3492177 C17.0802569,11.7237074 17.0802569,12.2763107 16.7592657,12.6508004 L10.7592657,19.6508004 C10.3998435,20.0701263 9.76854353,20.1186878 9.34921769,19.7592657 C8.92989185,19.3998435 8.88133031,18.7685435 9.24075246,18.3492177 L14.6829313,12.0000091 Z"
          fill={fill}
        />
      </g>
    </g>
  </svg>
);

type Props = {
  fill?: string;
  width?: string;
};
