/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as Icons from './Icons';

export default { 
  title: 'Components/Core/Icons'
};

export const normal = () => (
  <div>
    {Object.keys(Icons).map(icon => {
      const Icon = Icons[icon];
      return (
        <div
          key={icon}
          style={{
            display: 'inline-block',
            margin: '2rem 0 0 2rem',
            padding: '2rem',
            textAlign: 'center',
            width: '8.75rem'
          }}
        >
          <Icon fill="#000" />
          <div
            style={{
              margin: '2rem auto 0'
            }}
          >
            {icon}
          </div>
        </div>
      );
    })}
  </div>
);
