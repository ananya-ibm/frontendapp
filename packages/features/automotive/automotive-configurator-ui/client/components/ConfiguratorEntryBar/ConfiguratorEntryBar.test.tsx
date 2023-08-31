/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { renderWithTheme } from '@testUtils';
import { ConfiguratorEntryBar } from './ConfiguratorEntryBar';

jest.mock('@exo/frontend-features-automotive-configurator-logic', () => ({
  useProduct: () => ({ loading: true })
}));

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useCartModification: () => ({ cart: { add() {} } }),
  useFinance: () => ({ finance: { createPcp() {} } })
}));

jest.mock('@exo/frontend-common-session-context', () => ({
  useSessionContext: () => ({})
}));

jest.mock('@apollo/client', () => {
  const { gql } = jest.requireActual('@apollo/client');
  return {
    gql,
    useMutation: () => [() => {}, { error: null }]
  };
});

// ToDo: Write proper tests for this

describe('<ConfiguratorEntryBar /> component', () => {
  test.skip('its snapshot matches', () => {
    // @ts-ignore
    const { container } = renderWithTheme(<ConfiguratorEntryBar productId="OriginalBatMobile" />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
