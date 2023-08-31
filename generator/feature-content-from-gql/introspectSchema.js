/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fetch = require('sync-fetch')

function introspectSchema(endpoint) {
  const instrospectionQuery = {
    query: `{
      __schema {
        types {
          name
          kind
          inputFields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
    
          fields {
            name
            type {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
            args {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                  ofType {
                    name
                    kind
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {}
  };

  return fetch(endpoint, {
    "headers": {
      "accept": "*/*",
      "content-type": "application/json"
    },
    "body": JSON.stringify(instrospectionQuery), 
    "method": "POST"
  }).json();
}

function getAllInputTypes(type) {
  const getInputType = (t) => {
    if (t === null || t === undefined) return undefined;
    if (t.kind === 'INPUT_OBJECT') return t.name;
    return getInputType(t.ofType);
  }
  return type.args.map(a => getInputType(a.type)).filter(a => !!a);
}

function toGqlType(type, d='') {
  if (type.kind === 'NON_NULL') {
    return d + toGqlType(type.ofType) + '!';
  } else if (type.kind === 'LIST') {
    return d + '[' + toGqlType(type.ofType) + ']';
  } else {
    return type.name;
  }
}

function isGqlScalar(type) {
  if (type.kind === 'NON_NULL' || type.kind === 'LIST') return isGqlScalar(type.ofType);
  return type.kind === 'SCALAR';
}

function getGqlTypeName(type) {
  if (type.kind === 'NON_NULL' || type.kind === 'LIST') return getGqlTypeName(type.ofType);
  return type.name;
}

function isGqlList(type) {
  if (type.kind === 'NON_NULL') return isGqlList(type.ofType);
  if (type.kind === 'LIST') return true;
  return false;
}

function isGqlOptional(type) {
  if (type.kind === 'NON_NULL') return false;
  if (type.kind === 'LIST') return isGqlList(type.ofType);
  return true;
}

function getAttributes(typeName, types) {
  const t = types.find(t => t.name === typeName);
  return (t.fields ?? t.inputFields ?? [])
    .filter(a => isGqlScalar(a.type))
    .map(a => ({
      name: a.name,
      type: {
        name: getGqlTypeName(a.type),
        tsName: getGqlTypeName(a.type) === 'ID' ? 'string' : getGqlTypeName(a.type).toLowerCase(),
        isList: isGqlList(a.type),
        isOptional: isGqlList(a.type)
      }
    }));
}

function generateTypeClosure(type, types) {
  const dest = {};
  const typeName = getGqlTypeName(type);
  
  dest.name = typeName;
  dest.isList = isGqlList(type);
  dest.isOptional = isGqlList(type);

  dest.attributes = getAttributes(typeName, types);
  return dest;
}

module.exports = { introspectSchema, getAttributes, getAllInputTypes, toGqlType, isGqlList, isGqlScalar, getGqlTypeName, isGqlOptional, generateTypeClosure };