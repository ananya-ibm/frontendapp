/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const Check = ({ width = '16px', fill = 'currentColor' }: Props) => (
  <svg width={width} viewBox="0 0 16 12">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-1032.000000, -387.000000)">
        <g transform="translate(844.000000, 293.000000)">
          <g transform="translate(184.000000, 87.000000)">
            <g transform="translate(0.000000, 1.000000)">
              <rect fillRule="nonzero" x="0" y="0" width="24" height="24" />
              <path
                d="M9,15.5857864 L18.2928932,6.29289322 C18.6834175,5.90236893 19.3165825,5.90236893 19.7071068,6.29289322 C20.0976311,6.68341751 20.0976311,7.31658249 19.7071068,7.70710678 L9.70710678,17.7071068 C9.31658249,18.0976311 8.68341751,18.0976311 8.29289322,17.7071068 L4.29289322,13.7071068 C3.90236893,13.3165825 3.90236893,12.6834175 4.29289322,12.2928932 C4.68341751,11.9023689 5.31658249,11.9023689 5.70710678,12.2928932 L9,15.5857864 Z"
                fill={fill}
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

type Props = {
  fill?: string;
  width?: string;
};
