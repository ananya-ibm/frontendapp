/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-restricted-syntax */

import { Run } from '@carbon/react/icons';
import { DevWidget } from '@exo/frontend-features-dev-toolbar-ui';

export const PlaygroundLink = () => {
  return (
    <DevWidget
      tooltip="Open GQL Playground"
      onClick={() => window.open(process.env.GRAPHQL_ENDPOINT)}
      icon={<Run size={16} />}
    >
      Playground
    </DevWidget>
  );
};
