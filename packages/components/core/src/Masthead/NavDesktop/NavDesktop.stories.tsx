/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Action } from '@exo/frontend-components-base';
import { Search, User } from '@carbon/react/icons';
import { Masthead } from '../Masthead';

export default {
  title: 'Components/Core/Masthead/NavDesktop',
  component: Masthead.NavDesktop
} as any;

export const normal = () => (
  <Masthead.NavDesktop
    actions={
      <>
        <Action label="Lorem" href="#" />
        <Action label="Ipsum" href="#" />
        <Action label="Dolor" href="#" />
        <Action label="Sit" href="#" />
        <Action label="Amet" href="#" />
        <Action label="Consectetuer" href="#" />
        <Action label="Consectetuer" href="#" />
        <Action label="Consectetuer" href="#" />
        <Action label="Consectetuer" href="#" />
        <Action label="Consectetuer" href="#" />
      </>
    }
    secondaryActions={
      <>
        <Action label="Shopping Bag" icon={<Search size={16} className="icon" />} />
        <Action label="User" icon={<User size={16} className="icon" />} />
      </>
    }
  />
);
