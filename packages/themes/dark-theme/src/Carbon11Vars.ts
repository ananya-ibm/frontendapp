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
import { Carbon11Vars, PartialCarbon11Vars, g90 } from '@exo/frontend-theme-base-carbon-theme';

const overrides: PartialCarbon11Vars = {
};

const vars: Carbon11Vars = _.merge({}, g90, overrides) 
export default vars;