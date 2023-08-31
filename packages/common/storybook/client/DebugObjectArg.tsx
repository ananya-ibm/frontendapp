/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const DebugObjectArg = ({ name, value }: Props) => {
  return (
    <div style={{ fontFamily: 'courier', marginBottom: '1em' }}>
      <div style={{ fontWeight: 'bold' }}>{name}</div>

      <pre>{value === undefined ? '<undefined>' : JSON.stringify(value, undefined, '  ')}</pre>
    </div>
  );
};

type Props = {
  name: string;
  value?: any;
};
