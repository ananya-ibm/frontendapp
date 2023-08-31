/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Body } from '../../components/Body/Body';
import { HeroPageTitle } from '@exo/frontend-components-content';
import { LayoutSpacing } from '@exo/frontend-components-core';

export const SubscriptionsPage = ({}: Props) => {
  return (
    <>
      <HeroPageTitle 
        title = "Placeholder Subscriptions Page"
        image="https://www.insidehimalayas.com/wp-content/uploads/2016/04/nepal-everest-1.jpg"
        />
      <LayoutSpacing size = "sm" />
      <Body text="Subscriptions Page to appear here with different subscription options" />
    </>
  );
};

type Props = {};
