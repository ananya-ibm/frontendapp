/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { QuickOrderButton } from '../../components/QuickOrderButton/QuickOrderButton';

export const QuickOrderButtonExt = () => {
  const handleDispatch = (eventName: string) => {
    const event = new CustomEvent(eventName);
    document.dispatchEvent(event);
  };
  return <QuickOrderButton onClick={() => handleDispatch('quick-order-toggle')} />;
};