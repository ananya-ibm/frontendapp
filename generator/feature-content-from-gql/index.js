/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplicatiols -lan or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
const { introspectSchema, getAttributes, getAllInputTypes, toGqlType, isGqlList, getGqlTypeName, isGqlScalar, isGqlOptional, generateTypeClosure } = require('./introspectSchema');
const _ = require('lodash');
const fs = require('fs');
const camelCase = require('camelcase');
const { addAndFormat } = require('../utils');
const { promptSelectFeature, promptSelectUIFeature, promptSelectLogicFeature } = require('../shared/prompts');

let schema;
const getTypes = (endpoint) => {
  if (! schema) {
    schema = introspectSchema(endpoint).data.__schema;
  }
  return schema.types;
}

const addPage = (dest, data, pageName, paramName) => {
  dest.push({
    type: 'append',
    path: `../${data.feature}/${data.featureUi}/client/Routes.tsx`,
    pattern: /import .* from '\..*;/,
    template: `import { ${pageName} } from './pages/${pageName}/${pageName}';`,
    unique: true
  });

  if (paramName) {
    dest.push({
      type: 'append',
      path: `../${data.feature}/${data.featureUi}/client/Routes.tsx`,
      pattern: /<AppShellSwitch .*>/,
      template: `      <Route path='/${data.featureName}/${pageName}/:param' render={({ match }) => <${pageName} ${paramName}={match.params.param} />} />`,
      unique: true
    });
  } else {
    dest.push({
      type: 'append',
      path: `../${data.feature}/${data.featureUi}/client/Routes.tsx`,
      pattern: /<AppShellSwitch .*>/,
      template: `      <Route path='/${data.featureName}/${pageName}' render={() => <${pageName} />} />`,
      unique: true
    });
  }
}

module.exports = {
  description: 'Add feature content from GQL schema',
  prompts: [
    {
      type: 'input',
      name: 'endpoint',
      message: 'GraphQL endpoint?',
      default: 'http://localhost:4002/graphql',
      bypass: (a) => a
    },

    promptSelectFeature(),

    promptSelectUIFeature(),

    promptSelectLogicFeature(),

    {
      type: 'checkbox',
      message: 'Select queries',
      name: 'queries',
      pageSize: 12, 
      choices: (vars) => {
        const queries = getTypes(vars.endpoint).find(t => t.name === 'Query').fields.map(f => f.name).filter(f => !f.startsWith('_')).sort();
        return queries.map(q => ({ value: q }));
      },
      bypass: (a) => a.split(',')
    },

    { 
      type: 'checkbox',
      name: 'mutations',
      message: 'Select mutations',
      pageSize: 12, 
      choices: (vars) => {
        const mutations = getTypes(vars.endpoint).find(t => t.name === 'Mutation').fields.map(f => f.name).filter(f => !f.startsWith('_')).sort();
        return mutations.map(q => ({ value: q }));
      },
      bypass: (a) => a.split(',')
    },

    {
      type: 'checkbox',
      name: 'forms',
      message: 'Select input types to generate forms for',
      pageSize: 12,
      choices: (vars) => {
        return _.uniq(getTypes(vars.endpoint).find(t => t.name === 'Mutation').fields.filter(m => vars.mutations.includes(m.name))
          .flatMap(t => getAllInputTypes(t)));
      },
      bypass: (a) => a.split(',')
    },

    {
      type: 'checkbox',
      name: 'generate',
      message: 'Confirm artifacts to generate',
      choices: (vars) => {
        const dest = [];
        if (vars.queries.length > 0) {
          dest.push({ name: 'Query hook', value: 'query-hooks', checked: true });
          dest.push({ name: 'Smart components (Container)', value: 'smart-components', checked: true });
          dest.push({ name: 'UI components', value: 'ui-components', checked: true });
        }

        if (vars.mutations.length > 0) {
          dest.push({ name: 'Mutation hook', value: 'mutation-hook', checked: true });
          dest.push({ name: 'Form components', value: 'form-components', checked: true });
        }

        dest.push({ name: 'Pages', value: 'pages', checked: true });

        return dest;
      },
      bypass: (a) => a.split(',')
    }
  ],
  actions: data => { 
    data.featureUiPackage = JSON.parse(fs.readFileSync(`${data.feature}/${data.featureUi}/package.json`).toString()).name;
    data.featureLogicPackage = JSON.parse(fs.readFileSync(`${data.feature}/${data.featureLogic}/package.json`).toString()).name;

    const arr = data.feature.split('/');
    data.featureName = arr[arr.length - 1];

    const dest = [];

    for (const q of data.queries) {
      const query = getTypes(data.endpoint).find(t => t.name === 'Query').fields.find(f => f.name === q);
      const queryData = {
        ...data,
        queryName: q,
        query,
        args: query.args.map(a => ({ 
          name: a.name, 
          tsType: { 
            typename: isGqlScalar(a.type) ? getGqlTypeName(a.type).toLowerCase() : getGqlTypeName(a.type),
            isOptional: isGqlOptional(a.type),
            isScalar: isGqlScalar(a.type),
            isList: isGqlList(a.type),
          } 
        })),
        isSingleArg: query.args.length === 1,
        queryArgs: query.args.map(a => `$${a.name}: ${toGqlType(a.type)}`).join(', '),
        argBinding: query.args.map(a => `${a.name}: $${a.name}`).join(', '),
        argNames: query.args.map(a => a.name).join(', '),
        returnType: generateTypeClosure(query.type, getTypes(data.endpoint))
      };

      if (data.generate.includes('query-hooks')) {
        addAndFormat(dest, {
          type: 'add',
          path: `${data.feature}/${data.featureLogic}/client/hooks/use${camelCase(q, {pascalCase: true})}.ts`,
          templateFile: './feature-content-from-gql/logic/client/hooks/useQuery.hbs',
          data: queryData
        })
        dest.push({
          type: 'addToIndex',
          path: `${data.feature}/${data.featureLogic}/client/index.ts`,
          line: `export * from './hooks/use${camelCase(q, {pascalCase: true})}';`
        })
      }

      if (data.generate.includes('smart-components')) {
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureLogic}/client/smart-components/${camelCase(q, {pascalCase: true})}Container/${camelCase(q, {pascalCase: true})}Container.tsx`,
          templateFile: './feature-content-from-gql/logic/client/smart-components/Container.hbs',
          data: queryData
        }); 
        dest.push({   
          type: 'addToIndex',
          path: `${data.feature}/${data.featureLogic}/client/index.ts`,
          line: `export * from './smart-components/${camelCase(q, {pascalCase: true})}Container/${camelCase(q, {pascalCase: true})}Container';`
        });
      }

      if (data.generate.includes('ui-components')) {
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(q, {pascalCase: true})}/${camelCase(q, {pascalCase: true})}.tsx`,
          templateFile: './feature-content-from-gql/ui/client/components/Component.hbs',
          data: queryData
        });
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(q, {pascalCase: true})}/${camelCase(q, {pascalCase: true})}.styles.ts`,
          templateFile: './feature-content-from-gql/ui/client/components/Styles.hbs',
          data: queryData
        });
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(q, {pascalCase: true})}/${camelCase(q, {pascalCase: true})}.theme.ts`,
          templateFile: './feature-content-from-gql/ui/client/components/Theme.hbs',
          data: queryData
        });
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(q, {pascalCase: true})}/${camelCase(q, {pascalCase: true})}.stories.tsx`,
          templateFile: './feature-content-from-gql/ui/client/components/Stories.hbs',
          data: queryData
        });
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(q, {pascalCase: true})}/${camelCase(q, {pascalCase: true})}.test.tsx`,
          templateFile: './feature-content-from-gql/ui/client/components/Test.hbs',
          data: queryData
        });
      }

      if (data.generate.includes('pages') && data.generate.includes('ui-components') && data.generate.includes('smart-components')) {
        const pageName = `${camelCase(q, { pascalCase: true })}Page`;

        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/pages/${pageName}/${pageName}.tsx`,
          templateFile: './feature-content-from-gql/ui/client/pages/Page.hbs',
          data: {
            ...queryData,
            pageName
          }
        });

        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/pages/${pageName}/${pageName}.stories.tsx`,
          templateFile: './feature-content-from-gql/ui/client/pages/Page.stories.hbs',
          data: {
            ...queryData,
            pageName
          }
        });

        addPage(dest, data, pageName, queryData.isSingleArg ? queryData.args[0].name : undefined);
      }
    }

    if (data.generate.includes('mutation-hook')) {
      const mutationData = {
        ...data,
        mutationsDesc: data.mutations.map(m => {
          const mutationSchema = getTypes(data.endpoint).find(t => t.name === 'Mutation').fields.find(f => f.name === m);
          return {
            name: mutationSchema.name,
            mutationArgs: mutationSchema.args.map(a => `$${a.name}: ${toGqlType(a.type)}`).join(', '),
            argBinding: mutationSchema.args.map(a => `${a.name}: $${a.name}`).join(', '),    
            argNames: mutationSchema.args.map(a => a.name).join(', '),
            args: mutationSchema.args.map(a => ({ 
              name: a.name, 
              tsType: { 
                typename: isGqlScalar(a.type) ? getGqlTypeName(a.type).toLowerCase() : getGqlTypeName(a.type),
                isOptional: isGqlOptional(a.type),
                isScalar: isGqlScalar(a.type),
                isList: isGqlList(a.type),
                attributes: isGqlScalar(a.type) ? [] : getAttributes(getGqlTypeName(a.type), getTypes(data.endpoint))
              } 
            }))
          };
        }),
      }

      addAndFormat(dest, {
        path: `${data.feature}/${data.featureLogic}/client/hooks/use${camelCase(data.featureName, {pascalCase: true})}Modification.ts`,
        templateFile: './feature-content-from-gql/logic/client/hooks/useModification.hbs',
        data: mutationData 
      });
      dest.push({
        type: 'addToIndex',
        path: `${data.feature}/${data.featureLogic}/client/index.ts`,
        line: `export * from './hooks/use${camelCase(data.featureName, {pascalCase: true})}Modification';`
      })

    }

    if (data.generate.includes('form-components')) {
      for (const f of data.forms) {
        const formData = {
          ...data,
          formName: f,
          attributes: getAttributes(f, getTypes(data.endpoint))
        };
        addAndFormat(dest, {
          path: `${data.feature}/${data.featureUi}/client/components/${camelCase(f, {pascalCase: true})}Form/${camelCase(f, {pascalCase: true})}Form.tsx`,
          templateFile: './feature-content-from-gql/ui/client/components/Form.hbs',
          data: formData
        });

        if (data.generate.includes('pages')) {
          const pageName = `${camelCase(f, { pascalCase: true })}Page`;

          addAndFormat(dest, {
            path: `${data.feature}/${data.featureUi}/client/pages/${pageName}/${pageName}.tsx`,
            templateFile: './feature-content-from-gql/ui/client/pages/FormPage.hbs',
            data: {
              ...data,
              formName: f,
              pageName
            }
          });

          addPage(dest, data, pageName);
        }
      }
    }

    dest.push({ type: 'bootstrap' });

    return dest;
  } 
};
