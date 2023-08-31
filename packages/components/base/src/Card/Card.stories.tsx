/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';
import React from 'react';
import { Card, CardFoldableSection, CardFooter, CardSection, CardTitle } from './Card';

export default {
  title: 'Components/Base/Card',
  component: Card
};

type Props = React.ComponentProps<typeof Card>;

export const Default = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
Default.args = {} as Props;

export const WithTitle = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
WithTitle.args = {} as Props;

export const Interactive = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
Interactive.args = {
  interactive: true
} as Props;

export const WithMediaSection = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
WithMediaSection.args = {} as Props;

export const WithSecondarySection = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
      <CardSection type="secondary">{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
WithSecondarySection.args = {} as Props;

export const WithFoldableSection = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
      <CardFoldableSection>
        <CardSection>{faker.lorem.sentences(3)}</CardSection>
      </CardFoldableSection>
    </Card>
  </div>
);
WithFoldableSection.args = {} as Props;

export const WithFooter = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
      <CardFooter>Footer</CardFooter>
    </Card>
  </div>
);
WithFooter.args = {} as Props;

export const WithFooterActions = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
      <CardFooter
        primaryActions={[
          { label: 'Save', onClick: () => {} },
          { label: 'Delete', onClick: () => {} }
        ]}
        tertiaryActions={[
          { label: 'Save All', onClick: () => {} },
          { label: 'Clear', onClick: () => {} }
        ]}
      ></CardFooter>
    </Card>
  </div>
);
WithFooterActions.args = {} as Props;

export const WithTitleActions = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Card {...args}>
      <CardTitle
        primaryAction={{ label: 'Save', onClick: () => {} }}
        secondaryActions={[
          { label: 'Save All', onClick: () => {} },
          { label: 'Clear', onClick: () => {} }
        ]}
      >
        A title
      </CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
    </Card>
  </div>
);
WithTitleActions.args = {} as Props;

export const Horizontal = args => (
  <div style={{ maxWidth: '60rem' }}>
    <Card {...args}>
      <CardSection type="media">
        <img src={faker.image.fashion()} style={{ width: '100%' }} />
      </CardSection>
      <CardTitle>A title</CardTitle>
      <CardSection>{faker.lorem.sentences(3)}</CardSection>
      <CardFooter
        primaryActions={[
          { label: 'Save', onClick: () => {} },
          { label: 'Delete', onClick: () => {} }
        ]}
        tertiaryActions={[
          { label: 'Save All', onClick: () => {} },
          { label: 'Clear', onClick: () => {} }
        ]}
      ></CardFooter>
    </Card>
  </div>
);
Horizontal.args = {
  variant: 'horizontal'
} as Props;
