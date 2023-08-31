/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Action } from '@exo/frontend-components-base';
import { Search, ShoppingBag, User } from '@carbon/react/icons';
import { Masthead } from '../Masthead';
import { MenuToggle } from '../MenuToggle/MenuToggle';

export default {
  title: 'Components/Core/Masthead/Header',
  component: Masthead.Header
} as any;

export const normal = () => (
  <Masthead.Header
    logo={
      <Action
        label="Logo"
        href="#"
        icon={
          <img src="https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-Print-163213010.png" />
        }
      />
    }
    actions={
      <>
        <Action label="Search" icon={<Search size={24} className="icon" />} />
        <Action label="Shopping Bag" icon={<ShoppingBag size={24} className="icon" />} />
        <Action label="User" icon={<User size={24} className="icon" />} />
      </>
    }
    menuToggle={<MenuToggle render={() => <div />} />}
  />
);
