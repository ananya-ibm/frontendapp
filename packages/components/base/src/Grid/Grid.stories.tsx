/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Column } from './Column';
import { Row } from './Row';
import { Grid } from './Grid';

export default {
  title: 'Components/Base/Grid',
  component: Grid
};

const COLUMN_STYLE = {
  backgroundColor: 'pink',
  minHeight: '4rem',
  width: '100%',
  border: '1px dashed #B94366',
  padding: '0.5rem'
};

const COLUMN_STYLED_NESTED = {
  ...COLUMN_STYLE,
  backgroundColor: '#CFF3F2',
  borderColor: '#859B9B'
};

export const Default = args => (
  <Grid {...args}>
    <Row>
      <Column sm={2} md={4} lg={10}>
        <div style={COLUMN_STYLE}>sm=2, md=4, lg=8</div>
      </Column>
      <Column sm={2} md={2} lg={3}>
        <div style={COLUMN_STYLE}>sm=2, md=2, lg=2</div>
      </Column>
      <Column sm={2} md={2} lg={3}>
        <div style={COLUMN_STYLE}>sm=2, md=2, lg=2</div>
      </Column>
    </Row>
    <Row>
      <Column sm={1}>
        <div style={COLUMN_STYLE}>sm=1</div>
      </Column>
      <Column sm={1}>
        <div style={COLUMN_STYLE}>sm=1</div>
      </Column>
      <Column sm={2}>
        <div style={COLUMN_STYLE}>sm=2</div>
      </Column>
    </Row>
  </Grid>
);
Default.args = {};

export const WithPercentageWidths = args => (
  <Grid {...args}>
    <Row>
      <Column sm={'50%'} md={'50%'} lg={'75%'}>
        <div style={COLUMN_STYLE}>sm=50%, md=50%, lg=75%</div>
      </Column>
      <Column sm={'50%'} md={'25%'} lg={'10%'}>
        <div style={COLUMN_STYLE}>sm=50%, md=25%, lg=10%</div>
      </Column>
      <Column sm={'50%'} md={'25%'} lg={'10%'}>
        <div style={COLUMN_STYLE}>sm=50%, md=25%, lg=10%</div>
      </Column>
    </Row>
    <Row>
      <Column sm={'25%'}>
        <div style={COLUMN_STYLE}>sm=25%</div>
      </Column>
      <Column sm={'25%'}>
        <div style={COLUMN_STYLE}>sm=25%</div>
      </Column>
      <Column sm={'50%'}>
        <div style={COLUMN_STYLE}>sm=50%</div>
      </Column>
    </Row>
  </Grid>
);
WithPercentageWidths.args = {};

export const WithGaps = args => Default(args);
WithGaps.args = {
  gaps: 'both'
};

export const NoGaps = args => Default(args);
NoGaps.args = {
  gaps: 'none'
};

export const Nested = args => (
  <Grid {...args}>
    <Row>
      <Column sm={'100%'}>
        <div style={COLUMN_STYLE}>sm=100%</div>
      </Column>
    </Row>
    <Row>
      <Column sm={'100%'}>
        <Grid gaps={'both'}>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=100% / sm=100%</div>
            </Column>
          </Row>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=100% / sm=100%</div>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
    <Row>
      <Column sm={'25%'}>
        <Grid gaps={'both'}>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
            </Column>
          </Row>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
            </Column>
          </Row>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
            </Column>
          </Row>
          <Row>
            <Column sm={'100%'}>
              <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
            </Column>
          </Row>
        </Grid>
      </Column>
      <Column sm={'75%'}>
        <div style={COLUMN_STYLE}>sm=75%</div>
      </Column>
    </Row>
  </Grid>
);
Nested.args = {
  gaps: 'both'
};

export const NestedWithoutNestedGrid = args => (
  <Grid {...args}>
    <Row>
      <Column sm={'100%'}>
        <div style={COLUMN_STYLE}>sm=100%</div>
      </Column>
    </Row>
    <Row>
      <Column sm={'100%'}>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=100% / sm=100%</div>
          </Column>
        </Row>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=100% / sm=100%</div>
          </Column>
        </Row>
      </Column>
    </Row>
    <Row>
      <Column sm={'25%'}>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
          </Column>
        </Row>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
          </Column>
        </Row>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
          </Column>
        </Row>
        <Row>
          <Column sm={'100%'}>
            <div style={COLUMN_STYLED_NESTED}>sm=25% / sm=100%</div>
          </Column>
        </Row>
      </Column>
      <Column sm={'75%'}>
        <div style={COLUMN_STYLE}>sm=75%</div>
      </Column>
    </Row>
  </Grid>
);
NestedWithoutNestedGrid.args = {
  gaps: 'both'
};

export const Fluid = args => Default(args);
Fluid.args = {
  isFluid: true
};
