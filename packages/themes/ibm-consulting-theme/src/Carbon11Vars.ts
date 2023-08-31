/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
  NOTE: If you change this file you must run `npm run build-themes` to update the carbon CSS file
*/

import _ from 'lodash';
import { Carbon11Vars, PartialCarbon11Vars, white } from '@exo/frontend-theme-base-carbon-theme';

const overrides: PartialCarbon11Vars = {
  "button-primary": '#0043CE'
};

const vars: Carbon11Vars = _.merge({}, white, overrides) 
export default vars;