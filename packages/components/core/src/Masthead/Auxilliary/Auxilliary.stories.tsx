/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Action } from '@exo/frontend-components-base';
import { Masthead } from '../Masthead';

export default {
  title: 'Components/Core/Masthead/Auxilliary',
  component: Masthead.Auxilliary
} as any;

export const normal = () => (
  <Masthead.Auxilliary
    actions={
      <>
        <Action label="Action 1" href="#" />
        <Action label="Action 2" href="#" />
        <Action label="Action 3" href="#" />
      </>
    }
  />
);
