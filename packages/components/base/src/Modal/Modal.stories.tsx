/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';
import React from 'react';
import { Modal } from './Modal';

export default {
  title: 'Components/Base/Modal',
  component: Modal
};

export const Default = args => (
  <div>
    <div
      style={{
        backgroundImage: 'url(/static/ibm-unsplash.jpg)',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        filter: 'blur(2px)'
      }}
    />
    <Modal {...args}>
      <p>Some modal content</p>
    </Modal>
  </div>
);
Default.args = {
  onClick: () => {},
  modalHeading: 'A modal title'
};

export const WithScrollableContent = args => (
  <div>
    <div
      style={{
        backgroundImage: 'url(/static/ibm-unsplash.jpg)',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        filter: 'blur(2px)'
      }}
    />
    <Modal {...args}>
      <p>{faker.lorem.paragraphs(15)}</p>
      <p>{faker.lorem.paragraphs(15)}</p>
      <p>{faker.lorem.paragraphs(15)}</p>
      <p>{faker.lorem.paragraphs(15)}</p>
    </Modal>
  </div>
);
WithScrollableContent.args = {
  ...Default.args,
  isScrollable: true
};
