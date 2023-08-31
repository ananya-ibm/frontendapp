/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';

export const AemContainerContentContext = React.createContext<any>(undefined);

export const useContainerContent = () => {
  return useContext(AemContainerContentContext);
};

export const AemSpotsContext = React.createContext<Record<string, any> | undefined>(undefined);

export const useSpotsContent = () => {
  return useContext(AemSpotsContext);
};
