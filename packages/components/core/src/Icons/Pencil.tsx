/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const Pencil = ({ width = '16px', fill = 'currentColor' }: Props) => (
  <svg width={width} viewBox="0 0 20 20">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-407.000000, -477.000000)">
        <g transform="translate(284.000000, 293.000000)">
          <g transform="translate(32.000000, 88.000000)">
            <g transform="translate(89.000000, 94.000000)">
              <g>
                <rect fillRule="nonzero" x="0" y="0" width="24" height="24" />
                <path
                  d="M8.70710678,20.7071068 C8.56750624,20.8467073 8.38970726,20.9418625 8.19611614,20.9805807 L3.19611614,21.9805807 C2.496395,22.1205249 1.8794751,21.503605 2.01941932,20.8038839 L3.01941932,15.8038839 C3.05813755,15.6102927 3.15329267,15.4324938 3.29289322,15.2928932 L15.2928932,3.29289322 C16.787987,1.79779943 19.212013,1.79779943 20.7071068,3.29289322 C22.2022006,4.78798701 22.2022006,7.21201299 20.7071068,8.70710678 L8.70710678,20.7071068 Z M14.999444,6.41357288 L4.92120149,16.4930121 L4.27475488,19.7252451 L7.50698793,19.0787985 L17.585444,8.99957288 L14.999444,6.41357288 Z M16.7071068,4.70710678 L16.413444,4.99957288 L18.999444,7.58557288 L19.2928932,7.29289322 C20.0069384,6.57884801 20.0069384,5.42115199 19.2928932,4.70710678 C18.578848,3.99306157 17.421152,3.99306157 16.7071068,4.70710678 Z"
                  fill={fill}
                  fillRule="nonzero"
                />
              </g>
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
