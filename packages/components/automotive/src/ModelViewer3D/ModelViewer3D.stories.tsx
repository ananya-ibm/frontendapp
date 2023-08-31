/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import ModelViewer3D from './ModelViewer3D';

export default {
  title: 'Components/Automotive/ModelViewer3D',
  component: ModelViewer3D
};

const storyProps = {};

export const normal = args => <ModelViewer3D {...args} />;
normal.args = storyProps;
