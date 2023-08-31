#!/usr/bin/env node

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable */

const fs = require('fs');

let target;
let showMissing = false;
let showExtra = false;
for (const arg of process.argv.slice(2)) {
  if (arg === '--show-missing') {
    showMissing = true;
  } else if (arg === '--show-extra') {
    showExtra = true;
  } else {
    target = arg;
  }
}

const links = [];
const packages = [];

function findPackages(d) {
  if (fs.existsSync(`${d}/package.json`)) {
    packages.push(`${d}/package.json`);
  }

  for (const f of fs.readdirSync(d)) {
    if (f === 'node_modules' || f === 'dist' || f[0] === '.') continue;
    if (!fs.lstatSync(`${d}/${f}`).isDirectory()) continue;
    findPackages(`${d}/${f}`);
  }
}

findPackages('.');

for (const p of packages) {
  const { scripts } = JSON.parse(fs.readFileSync(p));
  if (!scripts) continue;

  for (const [name, script] of Object.entries(scripts)) {
    const fromPackage = p.substring(0, p.length - 12);

    for (let command of script.split('&&')) {
      command = command.trim();
      const lst = command.split(' ');

      let toLabel = lst.slice(2).find(arg => arg[0] !== '-');

      let toPackages = [];
      if (lst[0] === 'lerna' && lst[1] === 'run') {
        toPackages = packages.filter(pkg => pkg !== './package.json');
      } else if (lst[0] === 'lerna' && lst[1] === 'exec') {
        toLabel = lst
          .slice(lst.slice(2).findIndex(arg => arg.trim() === '--') + 5)
          .find(arg => arg[0] !== '-');
        const toPkg = lst[lst.slice(2).findIndex(arg => arg.trim() === '--scope') + 3];
        toPackages = [packages.find(dpkg => JSON.parse(fs.readFileSync(dpkg)).name === toPkg)];
      } else if (lst[0] === 'npm' && lst[1] === 'run') {
        toPackages = [p];
      }

      if (toPackages.length === 0) {
        links.push({
          from: { pkg: fromPackage, label: name },
          to: { pkg: '', label: '' },
          fullDef: script,
          def: command,
          count: 0,
          idx: 0
        });
      } else {
        for (let i = 0; i < toPackages.length; i++) {
          const toPkg = toPackages[i];
          links.push({
            from: { pkg: fromPackage, label: name },
            to: { pkg: toPkg, label: toLabel },
            fullDef: script,
            def: command,
            count: toPackages.length,
            idx: i
          });
        }
      }
    }
  }
}

function scriptsForPkg(pkg) {
  const scripts = [];
  for (const link of links) {
    if (link.from.pkg === pkg) {
      scripts.push(link.from.label);
    }
  }
  return [...new Set(scripts)];
}

function normalizePkg(p) {
  return p.substring(0, p.length - 12);
}

function space(amount) {
  let s = '';
  for (let i = 0; i < amount; i++) {
    s += '    ';
  }
  return s;
}

function trace(fromPkg, fromLabel, indent, printHeader, noPrint, scripts) {
  function log(m) {
    if (!noPrint) {
      console.log(m);
    }
  }

  scripts.push([fromPkg, fromLabel]);

  let fullDef = '';
  const defs = [];
  for (const link of links) {
    if (link.from.pkg === fromPkg && link.from.label === fromLabel && link.idx === 0) {
      defs.push(link.def);
      fullDef = link.fullDef;
    }
  }

  if (defs.length === 0) {
    if (printHeader && showMissing && fromPkg) {
      log(`${space(indent)}${fromPkg}package.json`);
      log(`${space(indent + 1)}:${fromLabel} -> *** MISSING ***`);
    }
    return;
  }

  if (printHeader) {
    log(`${space(indent)}${fromPkg}package.json`);
    if (fullDef !== defs[0]) {
      log(`${space(indent + 1)}:${fromLabel} -> ${fullDef}`);
    } else {
      log(`${space(indent + 1)}:${fromLabel}`);
    }
  } else {
    if (fullDef !== defs[0]) {
      log(`${space(indent)}:${fromLabel} -> ${fullDef}`);
    } else {
      log(`${space(indent)}:${fromLabel}`);
    }
  }

  for (const def of defs) {
    log(`${space(indent + (printHeader ? 2 : 1))}> ${def}`);
    for (const link of links) {
      if (link.from.pkg === fromPkg && link.from.label === fromLabel && link.def === def) {
        trace(
          normalizePkg(link.to.pkg),
          link.to.label,
          indent + (printHeader ? 3 : 2),
          normalizePkg(link.to.pkg) !== fromPkg,
          noPrint,
          scripts
        );
      }
    }
  }
}

for (let i = 0; i < packages.length; i++) {
  packages[i] = packages[i].substring(0, packages[i].length - 12);
}

if (showExtra) {
  const visited = [];

  const pkg = packages[0];
  for (const script of scriptsForPkg(pkg)) {
    if (target && script !== target) continue;
    trace(pkg, script, 0, false, true, visited);
  }

  for (const pkg of packages.slice(1)) {
    for (const script of scriptsForPkg(pkg)) {
      if (!visited.find(v => v[0] === pkg && v[1] === script)) {
        console.log(`WARNING: ${pkg}:${script} not used`);
      }
    }
  }
} else {
  const pkg = packages[0];
  for (const script of scriptsForPkg(pkg)) {
    if (target && script !== target) continue;
    trace(pkg, script, 0, false, false, []);
    console.log();
  }
}
