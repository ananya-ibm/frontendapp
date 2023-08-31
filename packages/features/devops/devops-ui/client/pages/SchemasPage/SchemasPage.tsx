/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SchemasContainer } from '@exo/frontend-features-devops-logic';
import { Schemas } from '../../components/Schemas/Schemas';

export const SchemasPage = ({}: Props) => {
  return (
    <>
      <SchemasContainer render={props => <Schemas {...props} />} />
    </>
  );
};

type Props = {};
