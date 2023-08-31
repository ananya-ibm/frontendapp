/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { List } from './List';

export default {
  title: 'Components/Extra/List',
  component: List
};

const storyProps = {
  items: [
    {
      title: '16/09/19',
      text: 'XX 000 0000'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000'
    }
  ]
};

export const normal = args => <List {...args} />;
normal.args = storyProps;

const storyLinkProps = {
  items: [
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    }
  ]
};

export const withLinkProps = args => <List {...args} />;
withLinkProps.args = storyLinkProps;
