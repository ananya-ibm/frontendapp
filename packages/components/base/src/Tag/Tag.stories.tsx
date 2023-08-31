/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tag } from './Tag';

export default {
  title: 'Components/Base/Tag',
  component: Tag
};

type Props = React.ComponentProps<typeof Tag>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => <Tag {...args} />;
Default.args = {
  label: 'Sample tag label'
} as Props;

export const Skeleton = () => <Tag.Skeleton />;
