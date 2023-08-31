/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const AppErrorBoundary = ({ children, fallbackComponent }: Props) => {
  return <ErrorBoundary FallbackComponent={fallbackComponent}>{children}</ErrorBoundary>;
};

type Props = {
  children: any;
  fallbackComponent: any;
};

export default AppErrorBoundary;
