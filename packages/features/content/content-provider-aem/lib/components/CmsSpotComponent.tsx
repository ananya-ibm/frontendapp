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
import * as S from './CmsSpotComponent.styles';
import { useChildComponents } from './useChildComponents';
import { useEditorMode } from './useEditorMode';

interface CmsSpotComponentProperties extends AllowedComponentsProperties, ResponsiveGridProperties {
  spotName: string;
}

export const CmsSpotComponent = (props: CmsSpotComponentProperties) => {
  const isInEditMode = useEditorMode();
  const childComponents = useChildComponents(props);

  const showOutline = isInEditMode && !props.allowedComponents?.applicable;

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
    <S.Overlay editMode={showOutline}>
      <S.OverlayLabel editMode={showOutline}>Spot: {props.spotName}</S.OverlayLabel>
      {childComponents}

      {showOutline && (
        <div
          data-cq-data-path={`${props.cqPath}/*`}
          className={Constants.NEW_SECTION_CLASS_NAMES}
        />
      )}
    </S.Overlay>
  );
};
