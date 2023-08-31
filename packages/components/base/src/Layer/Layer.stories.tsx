/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Layer } from './Layer';
import { TextInput } from '../TextInput/TextInput';

type Props = React.ComponentProps<typeof Layer>;

export default {
  title: 'Components/Base/Layer',
  component: Layer
};

export const Default = () => (
  <div>
    <div style={{ marginBottom: '1rem' }}>Depth 1</div>
    <TextInput id="d1" labelText='Sample' />
    <br />

    <Layer isStyled>
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>Depth 2</div>
        <TextInput id="d2" labelText='Sample' />
        <br />

        <Layer isStyled>
          <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>Depth 3</div>
            <TextInput id="d3" labelText='Sample' />
            <br />
          </div>
        </Layer>

      </div>
    </Layer>
  </div>
);
Default.args = {
} as Props;