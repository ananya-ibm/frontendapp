/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import {  View } from '@carbon/react/icons';
import * as S from './CustomerConfiguration.styles';

//TO DO - Add Finance information
export const CustomerConfiguration = ({
  configuration
}: Props) => (
  <S.CustomerConfiguration>
    <S.Content>
      <div>
        Product and Configuration: {configuration.productId} with {configuration.description}
        <p></p>
        </div>
    </S.Content>
    <S.ConfiguratorLink>
      <View size="16" className="brand-color icon" />
      <Button
        variant="link"
        label="View Configuration"
        onClick={() =>
          window.location.assign(
            `/automotive/${configuration.productId}/configuration/${configuration.id}`
          )
        }
      />
    </S.ConfiguratorLink>
  </S.CustomerConfiguration>
);

type Props = {
  configuration: {
    description?: string;
    id?: string;
    productId?: string;
  };
};
