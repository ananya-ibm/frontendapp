/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Video } from './Video';

export default {
  title: 'Components/Content/Video',
  component: Video
};

const storyProps = {
  title: 'Example video and CTA',
  color: 'black',
  videoURL: 'https://www.youtube.com/watch?v=J727tCXTggk',
  accentText: 'Video',
  buttonText: 'Watch more'
};

export const normal = args => <Video {...args} />;
normal.args = storyProps;
