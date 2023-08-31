/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer } from '@exo/frontend-content-api';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { Hero } from '@exo/frontend-components-content';
import { useIntl } from '@exo/frontend-common-i18n';
import { SampleDataContainer } from '@exo/frontend-features-sample-logic';
import { SampleComponent } from '../../components/SampleComponent/SampleComponent';
import { useEffectOnce } from '@exo/frontend-common-hooks';

export const TestPage = () => {
  const eventContext = useEventContext();
  const intl = useIntl('features.content.homepage-ui.pages.HomePage');

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });

  return (
    <CmsContainer name="homepage">
      <div className="bleed">
        <Hero
          subtitle={intl.msg('hero.subtitle', 'IBM iX')}
          title={intl.msg('hero.title', 'EXO STARTER KIT')}
          text={intl.msg(
            'hero.body',
            'Starting a new EXO project? Welcome to the party, pal.'
          )}
          image="https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2203&q=80"
          ctaText={intl.msg('hero.cta', 'Get Started')}
          ctaLink="#"
        />
      </div>

      <SampleDataContainer 
        renderError={() => <div>Error fetching categories...</div>}
        render={props => <SampleComponent {...props} />} 
      />
    </CmsContainer>
  );
};
