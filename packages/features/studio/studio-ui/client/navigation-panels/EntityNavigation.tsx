/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { SideNavLink } from '@carbon/react';
import { Box } from '@carbon/react/icons';

export const EventNavigation = () => {
  const history = useHistory();

  return (
    <>
      <SideNavLink isActive={history.location.pathname === '/studio/events'} renderIcon={Box} href="#" onClick={() => history.push('/studio/events')}>Event Archive</SideNavLink>
    </>
  );
}