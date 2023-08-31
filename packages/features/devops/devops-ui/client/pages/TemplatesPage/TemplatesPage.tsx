/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TemplatesContainer } from '@exo/frontend-features-devops-logic';
import { Templates } from '../../components/Templates/Templates';

export const TemplatesPage = ({}: Props) => {
  return (
    <>
      <TemplatesContainer render={props => <Templates {...props} />} />
    </>
  );
};

type Props = {};
