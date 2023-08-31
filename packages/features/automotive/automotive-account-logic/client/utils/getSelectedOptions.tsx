/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Configuration } from '../smart-components/types';

export const getSelectedOptions = (cfg: Configuration) =>
  cfg.optionCategories
    .flatMap(oca => oca.optionClassifications)
    .flatMap(ocl => ocl.options)
    .filter(o => o.selected)
    .map(o => ({ product: o.product }));

export const getPrice = (cfg: Configuration) =>
  getSelectedOptions(cfg).reduce((p, n) => p + Number(n?.product?.price?.list?.value), 0);
