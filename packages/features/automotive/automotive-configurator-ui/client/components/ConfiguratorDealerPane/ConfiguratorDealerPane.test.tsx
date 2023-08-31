/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { ArrowLeft, ArrowRight } from '@carbon/react/icons';
import { ConfiguratorDealerPane } from './ConfiguratorDealerPane';

const testProps = {
  onClick: () => {},
  beforeIcon: <ArrowLeft size={32} />,
  afterIcon: <ArrowRight size={32} />,
  text: 'Next'
};

describe('<ConfiguratorDealerPane /> component', () => {
  test('its snapshot matches', () => {
    // @ts-ignore
    const { container } = render(<ConfiguratorDealerPane {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
