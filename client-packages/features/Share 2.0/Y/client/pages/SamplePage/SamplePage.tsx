/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';

export const SamplePage = ({}: Props) => {
  const intl = useIntl('features.Share 2.0.Y.pages.SamplePage');
  return (
    <div>
      <h1>{intl.msg('page.title', 'Lorem ipsum dolor sit amet')}</h1>
    </div>
  );
};

type Props = {};
