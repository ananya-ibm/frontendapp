/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const removeNull = obj => {
  if (!obj) return obj;

  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v !== null));
};

export default removeNull;
