/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  AllowedComponentsProperties,
  Constants,
  ResponsiveGridProperties
} from '@adobe/aem-react-editable-components';
import React from 'react';
import { FieldPanel } from '@exo/frontend-components-forms';
import { useChildComponents } from '@exo/frontend-content-provider-aem';

interface FormContainerProperties extends AllowedComponentsProperties, ResponsiveGridProperties {
  redirect: string;
  action: string;
  method: string;
  id: string;
  name: string;
  enctype: string;
}

export const FormContainer = (props: FormContainerProperties) => {
  console.log('FormContainer', props);
  const childComponents = useChildComponents(props);

  if (props.allowedComponents?.applicable) {
    return (
      <div className={`aem-AllowedComponent--list ${Constants.NEW_SECTION_CLASS_NAMES}`}>
        <div data-text={'CMS Spot'} className={'aem-AllowedComponent--title'} />
        {props.allowedComponents.components.map(component => (
          <div
            key={component.path}
            data-cq-data-path={component.path}
            data-emptytext={component.title}
            className="aem-AllowedComponent--component cq-placeholder placeholder"
          />
        ))}
      </div>
    );
  }

  return (
    <form method={props.method} action={props.action} encType={props.enctype}>
      <input type="hidden" name=":formstart" value={props.cqPath} />
      <input type="hidden" name="_charset_" value="utf-8" />
      <input type="hidden" name=":redirect" value={props.redirect} />
      <FieldPanel>
        {childComponents}
        <div
          data-cq-data-path={`${props.cqPath}/*`}
          className={Constants.NEW_SECTION_CLASS_NAMES}
        />
      </FieldPanel>
    </form>
  );
};
