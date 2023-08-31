/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormHeader } from './FormHeader';
import { FormBody } from '../FormBody/FormBody';
import { FormFooter } from '../FormFooter/FormFooter';

export default {
  title: 'Components/Forms/Layout/FormHeader',
  component: FormHeader
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <>
    <FormHeader {...args}>
      <div style={{ width: '100%', height: '100%' }}>... this is the form header ...</div>
    </FormHeader>

    <FormBody>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form body ...
      </div>
    </FormBody>

    <FormFooter>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form footer ...
      </div>
    </FormFooter>
  </>
);
Default.args = {
  exampleProp: 'FormHeader'
};
