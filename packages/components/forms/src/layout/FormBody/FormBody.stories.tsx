/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormBody } from './FormBody';
import { FormHeader } from '../FormHeader/FormHeader';
import { FormFooter } from '../FormFooter/FormFooter';

export default {
  title: 'Components/Forms/Layout/FormBody',
  component: FormBody
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <>
    <FormHeader>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form header ...
      </div>
    </FormHeader>

    <FormBody {...args}>
      <div style={{ width: '100%', height: '100%' }}>... this is the body ...</div>
    </FormBody>

    <FormFooter>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#dddddd', padding: '1em' }}>
        ... this is the form footer ...
      </div>
    </FormFooter>
  </>
);
Default.args = {};
