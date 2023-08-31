/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const DefaultError = ({ error }) => {
  if (error instanceof Error) throw error;
  throw new Error(error);
};

export const DefaultLoading = () => {
  return 'Loading...';
};

export const renderDefaultError = error => <DefaultError error={error} />;
export const renderDefaultLoading = () => <DefaultLoading />;
