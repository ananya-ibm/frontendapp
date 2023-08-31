/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormFooter } from './FormFooter';
import { FormHeader } from '../FormHeader/FormHeader';
import { FormBody } from '../FormBody/FormBody';

export default {
  title: 'Components/Forms/Layout/FormFooter',
  component: FormFooter
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <>
    <FormHeader>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form header ...
      </div>
    </FormHeader>

    <FormBody>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form body ...
      </div>
    </FormBody>

    <FormFooter {...args}>
      <div style={{ width: '100%', height: '100%' }}>... this is the footer ...</div>
    </FormFooter>
  </>
);
Default.args = {
  exampleProp: 'FormFooter'
};
