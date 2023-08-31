/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContentList } from './ContentList';

export default {
  title: 'Components/Content/ContentList',
  component: ContentList
};

export const Default = () => <ContentList>
  <div style={{ width: '100%', height: '2rem', border: '2px solid red' }}></div>
  <div style={{ width: '100%', height: '3rem', border: '2px solid green' }}></div>
  <div style={{ width: '100%', height: '1rem', border: '2px solid blue' }}></div>
</ContentList>;

