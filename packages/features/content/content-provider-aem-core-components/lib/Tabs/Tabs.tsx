/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default */

import { Constants } from '@adobe/aem-react-editable-components';
import React from 'react';
import { Tabs as EXOTabs, Tab as EXOTab } from '@exo/frontend-components-base';
import {
  useChildComponents,
  useEditorMode,
  useAuthorPanelSwitch,
  AemMappedContainerComponentProps,
  CqItemsOrder
} from '@exo/frontend-content-provider-aem';

const isEmpty = (cqItemsOrder: CqItemsOrder) => {
  return cqItemsOrder.length === 0;
};

const Tabs$EditView = (props: AemMappedContainerComponentProps) => {
  const authorPanelState = useAuthorPanelSwitch(props.cqPath);
  const childComponents = useChildComponents(props);

  return (
    /* Please note that the classname and data-* attributes are needed for the AEM integration */
    <div className="cmp-tabs" data-cmp-is="tabs" data-panelcontains="tabs">
      {!isEmpty(props.cqItemsOrder) && (
        <>
          <EXOTabs selected={authorPanelState ?? 0}>
            {childComponents.map((item, index) => (
              <EXOTab
                id={`tab-content-${index}`}
                key={`tab-content-${index}`}
                label={item.props['cq:panelTitle']}
              >
                <div></div>
              </EXOTab>
            ))}
          </EXOTabs>

          {childComponents.map((item, index) => {
            const isVisible = (authorPanelState ?? 0) === index;
            const styles = { display: !isVisible ? 'none' : 'block' };
            return (
              <div key={`tab-content-${index}`} style={styles}>
                {item}
              </div>
            );
          })}
        </>
      )}
      <div data-cq-data-path={`${props.cqPath}/*`} className={Constants.NEW_SECTION_CLASS_NAMES} />
    </div>
  );
};

export const Tabs = (props: AemMappedContainerComponentProps) => {
  const isInEditMode = useEditorMode();
  const childComponents = useChildComponents(props);

  if (isInEditMode) {
    return <Tabs$EditView {...props} />;
  }

  return (
    <EXOTabs>
      {childComponents.map((item, index) => (
        <EXOTab
          id={`tab-content-${index}`}
          key={`tab-content-${index}`}
          label={item.props['cq:panelTitle']}
        >
          {item}
        </EXOTab>
      ))}
    </EXOTabs>
  );
};
