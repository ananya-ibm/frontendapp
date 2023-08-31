/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DepartmentSelector } from './DepartmentSelector';

export default {
  title: 'Components/Content/DepartmentSelector',
  component: DepartmentSelector
};

const twoStoryProps = {
  departments: [
    {
      title: 'Women',
      bgImg:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      altText: 'Womenswear',
      href: '#'
    },
    {
      title: 'Men',
      bgImg:
        'https://images.unsplash.com/photo-1522609946836-c85cba8eb943?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      altText: 'Menswear',
      href: '#'
    }
  ]
};

export const twoDepartments = args => <DepartmentSelector {...args} />;
twoDepartments.args = twoStoryProps;

const fourStoryProps = {
  departments: [
    {
      title: 'Women',
      bgImg:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      altText: 'Womenswear',
      href: '#'
    },
    {
      title: 'Men',
      bgImg:
        'https://images.unsplash.com/photo-1522609946836-c85cba8eb943?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      altText: 'Menswear',
      href: '#'
    },
    {
      title: 'Kids',
      bgImg:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      altText: 'Kidswear',
      href: '#'
    },
    {
      title: 'Homeware',
      bgImg:
        'https://images.unsplash.com/photo-1522609946836-c85cba8eb943?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      altText: 'Homeware',
      href: '#'
    }
  ]
};

export const fourDepartments = args => <DepartmentSelector {...args} />;
fourDepartments.args = fourStoryProps;
