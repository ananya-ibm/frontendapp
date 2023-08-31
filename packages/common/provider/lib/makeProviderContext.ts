/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Provider } from './types';

export const makeProviderContext = <P, C, E>() =>
  React.createContext<Provider<P, C, E> | undefined>(undefined);
