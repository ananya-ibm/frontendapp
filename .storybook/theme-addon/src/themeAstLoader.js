/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-return-assign */

const babelParser = require("@babel/parser");

function isMemberExpression(m) {
  return m.type === 'MemberExpression' || m.type === 'OptionalMemberExpression';
}

function resolveMemberExpression(m) {
  if (isMemberExpression(m)) {
    return [...resolveMemberExpression(m.object), ...resolveMemberExpression(m.property)]
  } if (m.type === 'Identifier') {
    return [m.name];
  } if (m.type === 'StringLiteral') {
    return [m.value];
  } 
  throw new Error(`Unsupported type in member expression ${m.type}`);        
}

function loader(content, map, meta) {
  const res = {
    vars: {}
  };

  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });

  const returnStmtArg = ast.program.body
    .find(b => b.type === 'ExportDefaultDeclaration')
    .declaration.body.body
    .find(b => b.type === 'ReturnStatement')
    .argument;

  console.assert(returnStmtArg.type === 'ObjectExpression');

  returnStmtArg.properties.forEach(p => {
    if (p.type === 'ObjectProperty') {
      if (isMemberExpression(p.value)) {
        res.vars[p.key.name] = [ { type: 'ref', value: resolveMemberExpression(p.value) } ];
      } else if (p.value.type === 'TemplateLiteral') {
        let expr = p.value.expressions.map((n) => {
          if (isMemberExpression(n)) {
            return { start: n.start, value: resolveMemberExpression(n) };
          } else {
            throw new Error(`Unknown template literval expressoin element of type ${p.type}`);
          }
        })

        let quasis = p.value.quasis
          .filter(n => n.value.raw !== '')
          .map(n => ({ start: n.start, value: n.value.raw }))

        const dest = [];

        while (expr.length > 0 && quasis.length > 0) {
          if (expr[0].start < quasis[0].start) {
            dest.push({ type: 'ref', value: expr[0].value });
            expr = expr.slice(1);
          } else {
            dest.push({ type: 'value', value: quasis[0].value });
            quasis = quasis.slice(1);
          }
        }

        expr.forEach(e => dest.push({ type: 'ref', value: e.value }))
        quasis.forEach(e => dest.push({ type: 'value', value: e.value }))

        res.vars[p.key.name] = dest;
      } else if (p.value.type === 'StringLiteral') {
        res.vars[p.key.name] = [{ type: 'value', value: p.value.value }];
      } else {
        throw new Error(`Unknown property value of type ${p.value.type}`);
      }
    } else if (p.type === 'SpreadElement') {
      res.base = resolveMemberExpression(p.argument).join('.');
    } else {
      throw new Error(`Unexpected object member of type ${p.type}`);
    }
  });

  return `module.exports = ${JSON.stringify(res)};`;
};

module.exports = loader;

// This is how you can debug this code
//console.log(loader(require('fs').readFileSync('/Users/magnusjohansson/Documents/Work/internal-projects/liberty/ixl-frontend/packages/components/automotive/src/ConfigurationSummary/ConfigurationSummary.theme.js').toString()));