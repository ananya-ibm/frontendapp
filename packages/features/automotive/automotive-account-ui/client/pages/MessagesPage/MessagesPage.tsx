/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { MessagesContainer } from '@exo/frontend-features-automotive-account-logic';
import { Messages } from '../../components/Messages/Messages';

export const MessagesPage = () => {
  return (
    <Dashboard title="Messages">
      <MessagesContainer render={props => <Messages {...props} />} />
    </Dashboard>
  );
};
