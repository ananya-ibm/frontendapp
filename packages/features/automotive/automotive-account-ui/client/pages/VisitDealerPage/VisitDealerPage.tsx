/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { DealerQR } from '../../components/DealerQR/DealerQR';

export const VisitDealerPage = () => {
  return (
    <Dashboard title="Visit Dealer">
      <DealerQR/>
    </Dashboard>
  );
};
