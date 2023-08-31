/* eslint-disable react/prop-types */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const AemComponentErrorHandler = ({ error }: { error: any; componentName: string }) => {
  return (
    <div role="alert">
      <p>Please refresh and try again</p>
      <p>Something went wrong with this component:</p>
      <pre>{error?.message}</pre>
    </div>
  );
};
