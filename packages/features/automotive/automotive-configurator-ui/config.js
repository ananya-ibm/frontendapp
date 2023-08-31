/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const isLocal =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'test' ||
  !process.env.NODE_ENV;

const { GRAPHQL_ENDPOINT, GRAPHQL_BATCH } = process.env;

module.exports = {
  GRAPHQL_ENDPOINT,
  GRAPHQL_BATCH,
  isLocal
};
