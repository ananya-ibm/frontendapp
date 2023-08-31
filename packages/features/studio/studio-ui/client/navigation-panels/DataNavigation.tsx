/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { EntityNavigationContainer } from '@exo/frontend-features-studio-logic';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const DataNavigation = () => {
  const history = useHistory();
  const pathArr = history.location.pathname.split('/');
  const selected = pathArr.includes('entities') ? pathArr[pathArr.length - 1] : undefined;

  return (<EntityNavigationContainer
    render={({ entities }) => (
      <Sidebar
        entities={entities}
        selected={selected}
        onClick={(s) => history.push(`/studio/data/entities/${s}`)}
      />
    )}
  />);
}