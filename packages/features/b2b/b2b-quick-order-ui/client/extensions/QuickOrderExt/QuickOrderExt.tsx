/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { QuickOrderFormContainer } from '@exo/frontend-features-b2b-quick-order-logic';
import React, { useState, useEffect } from 'react';

import { QuickOrderForm } from '../../components/QuickOrderForm/QuickOrderForm';

export const QuickOrderExt = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    const handleEvent = () => {
      setIsActive(!isActive);
    };
    document.addEventListener('quick-order-toggle', handleEvent, false);

    return () => {
      document.removeEventListener('quick-order-toggle', handleEvent, false);
    };
  });

  return (
    <div>
      <QuickOrderFormContainer
        render={props => (
          <QuickOrderForm {...props} onClose={() => setIsActive(false)} isOpen={isActive} />
        )}
      />
    </div>
  );
};