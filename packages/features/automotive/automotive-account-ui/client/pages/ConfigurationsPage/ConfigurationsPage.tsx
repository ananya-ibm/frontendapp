/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import {
  Configuration,
  Money,
  SavedConfigurationsContainer
} from '@exo/frontend-features-automotive-account-logic';
import { SavedConfiguration } from '@exo/frontend-components-automotive';
import { getClientImagePath } from '@exo/frontend-common-utils';
import * as S from './ConfigurationsPage.styles';

type ConfigurationSummary = {
  id: string;
  description?: string;
  image: string;
  productId: string;
  amount: Money;
};

const getSelectedOptions = (cfg: Configuration) =>
  cfg.optionCategories
    .flatMap(oca => oca.optionClassifications)
    .flatMap(ocl => ocl.options)
    .filter(o => o.selected)
    .map(o => ({ product: o.product }));

const getPrice = (cfg: Configuration) =>
  getSelectedOptions(cfg).reduce((p, n) => p + Number(n?.product.price.list.value), 0);

const mapConfiguration = (conf: Configuration): ConfigurationSummary => ({
  id: conf.id,
  description: conf.baseProduct?.description || conf.baseProduct?.longDescription,
  image: getClientImagePath(conf.baseProduct?.thumbnail),
  productId: conf.baseProduct?.id,
  amount: {
    currency: conf.baseProduct?.price?.list?.currency || 'GBP',
    value: Number(conf?.baseProduct?.price?.list?.value) + getPrice(conf) || '0.00'
  }
});

export const ConfigurationsPage = () => {
  return (
    <Dashboard title="Saved configurations">
      <SavedConfigurationsContainer
        render={({ configurations, onDelete, onCartAdd }) => (
          <S.SavedConfigurations>
            {configurations?.length === 0 && <>You do not have any saved configurations yet.</>}
            {configurations?.map(conf => (
              <SavedConfiguration
                key={conf.id}
                onDelete={() => onDelete?.(conf.id)}
                onCartAdd={() => onCartAdd?.(conf.id)}
                configuration={mapConfiguration(conf)}
              />
            ))}
          </S.SavedConfigurations>
        )}
      />
    </Dashboard>
  );
};
