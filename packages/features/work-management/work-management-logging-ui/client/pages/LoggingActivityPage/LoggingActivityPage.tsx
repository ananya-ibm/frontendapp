/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer } from '@exo/frontend-content-api';
import { LoginCountContainer } from '../../smart-components/LoginCountContainer/LoginCountContainer';
import { LoginCount } from '../../components/LoginCount/LoginCount';
import { LoadingIndicator } from '@exo/frontend-components-base';

export const LoggingActivityPage = () => {
  return (
    <CmsContainer name="loggingActivityPage">
      <div className="bleed">
      <LoginCountContainer
          render={args => <LoginCount {...args} />}
          renderLoading={() => <LoadingIndicator />}
        />
      </div>
    </CmsContainer>
  );
};
