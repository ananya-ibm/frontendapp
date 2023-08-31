/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ImageTile } from './ImageTile';

export default {
  title: 'Components/Commerce/ImageTile',
  component: ImageTile
};

const storyProps = {
  alt: 'alt',
  src:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
};

export const normal = args => <ImageTile {...args} />;
normal.args = storyProps;
