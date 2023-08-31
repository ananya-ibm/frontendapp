/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const handleApolloError = (source, error) => {
  if (!error) return;

  if (process.env.NODE_ENV === 'development' || process.env.JEST_WORKER_ID !== undefined) {
    // eslint-disable-next-line no-console
    console.error(`Error in ${source}: ${JSON.stringify(error, undefined, '  ')}`);
  }
};
