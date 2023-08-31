/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import JSONTree from 'react-json-tree';
import { Button, TextInput } from '@exo/frontend-components-base';
import * as S from './ConfiguratorDealerPane.styles';

export const ConfiguratorDealerPane = ({
  type,
  handleCustomerIDChange,
  cusomterConfigurationId,
  categories,
  financeData,
  handleBackToCustomer
}: Props) => {
  return type === 'DEALER' ? (
    <S.ConfiguratorDealerPane style={{}}>
      <S.Title>Dealer view</S.Title>
      <TextInput
        labelText="Enter customer Configurator ID:"
        id="cusomterConfigurationIdInput"
        type="text"
        onChange={handleCustomerIDChange}
        value={cusomterConfigurationId ?? ''}
      />
      <S.ConfiguratorTitle>Configurator Status</S.ConfiguratorTitle>
      <JSONTree data={{ categories, financeData }} />
      <Button variant="secondary" label="Back to customer view" onClick={handleBackToCustomer} />
    </S.ConfiguratorDealerPane>
  ) : (
    <></>
  );
};

type Props = {
  type: string;
  handleCustomerIDChange: () => void;
  cusomterConfigurationId: string;
  categories: any;
  financeData: any;
  handleBackToCustomer: () => void;
};

export default ConfiguratorDealerPane;
