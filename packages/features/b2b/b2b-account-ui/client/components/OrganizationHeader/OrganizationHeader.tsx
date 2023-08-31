/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DetailsGrid } from '@exo/frontend-components-core';
import { OrganizationContainerRenderProps } from '@exo/frontend-features-b2b-account-logic';

export const OrganizationHeader = ({ organization }: OrganizationContainerRenderProps) => {
  const headerDetails = [
    { title: 'ID', value: organization.id },
    { title: 'Name', value: organization.name }
  ];
  return <div>{headerDetails && <DetailsGrid details={headerDetails} />}</div>;
};
