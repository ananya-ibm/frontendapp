/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  ComponentMapping,
  MappedComponentProperties,
  Utils
} from '@adobe/aem-react-editable-components';
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';
import { CqItems, CqItemsOrder } from './types';

const getItemPath = (cqPath: string, itemKey: string) => {
  return cqPath ? `${cqPath}/${itemKey}` : itemKey;
};

const connectComponentWithItem = (
  ChildComponent: React.ComponentType<MappedComponentProperties>,
  itemProps: any,
  itemKey: string,
  cqPath: string,
  getItemComponentProps: GetItemComponentPropsType
) => {
  const itemPath = getItemPath(cqPath, itemKey);

  return (
    <ChildComponent
      {...itemProps}
      key={itemPath}
      cqPath={itemPath}
      isInEditor={AuthoringUtils.isInEditor()}
      containerProps={getItemComponentProps(itemProps, itemKey, itemPath)}
    />
  );
};

export const useChildComponents = ({
  cqPath,
  cqItems,
  cqItemsOrder,
  getItemComponentProps = () => ({})
}: Args) => {
  const childComponents: JSX.Element[] = [];

  if (!cqItems || !cqItemsOrder) {
    return childComponents;
  }

  cqItemsOrder.map(itemKey => {
    const itemProps = Utils.modelToProps(cqItems[itemKey]);

    if (itemProps) {
      const ItemComponent: React.ComponentType<MappedComponentProperties> = ComponentMapping.get(
        itemProps.cqType
      );

      if (ItemComponent) {
        childComponents.push(
          connectComponentWithItem(ItemComponent, itemProps, itemKey, cqPath, getItemComponentProps)
        );
      }
    }

    return undefined;
  });

  return childComponents;
};

type GetItemComponentPropsType = (itemProps: string, itemKey: string, itemPath: string) => any;

type Args = {
  cqPath: string;
  cqItems: CqItems;
  cqItemsOrder: CqItemsOrder;
  getItemComponentProps?: GetItemComponentPropsType;
};
