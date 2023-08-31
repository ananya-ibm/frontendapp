/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { rules } from './rules';

export const isPermitted = (action: string, roles: string[]) => {
  let checks = false;
  if (roles && roles.length) {
    roles.forEach(role => {
      const permissions = rules[role];
      if (!permissions) {
        // role is not present in the rules
        return;
      }

      const staticPermissions = permissions.static;
      if (staticPermissions && staticPermissions.includes(action)) {
        checks = true;
      }
    });
  }

  return checks;
};
