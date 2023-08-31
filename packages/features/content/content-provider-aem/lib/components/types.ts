/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Model } from '@adobe/aem-spa-page-model-manager';

export type CqItems = { [key: string]: Model };
export type CqItemsOrder = string[];

export type AemMappedContainerComponentProps = {
  cqItems: CqItems;
  cqItemsOrder: CqItemsOrder;
} & AemMappedComponentProps;

export type AemMappedComponentProps = {
  cqPath: string;
};
