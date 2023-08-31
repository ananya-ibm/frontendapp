#!/usr/bin/env node

var path = require('path')
var execSync = require('child_process').execSync
var semver = require('semver')

var specified = process.argv[2]
var cwd = specified
  ? path.isAbsolute(specified)
    ? specified
    : path.join(process.cwd(), specified)
  : process.cwd()
var pkg = require(path.join(cwd, 'package.json'))

function validateVersion(desired, command, message) {
  var actual = '0.0.0'
  try {
    actual = execSync(command)
      .toString()
      .trim()
  } catch (error) {
    return (
      'There was an error running the command `' +
      command +
      '`:\n' +
      error.message
    )
  }
  return semver.satisfies(actual, desired) ? null : message(actual, desired)
}

var messages = {
  node: function(actual, desired) {
    return (
      'This computer has node@' +
      actual +
      ' installed, but node@' +
      desired +
      ' is required. Please update node: https://nodejs.org. If you use nvm, please run `nvm use`.'
    )
  },
  npm: function(actual, desired) {
    return (
      'This computer has npm@' +
      actual +
      ' installed, but npm@' +
      desired +
      ' is required. Please update npm by running `npm install --global npm@' +
      desired +
      '`.'
    )
  },
}

var validators = {
  node: function(desired) {
    return validateVersion(desired, 'node --version', messages.node)
  },
  npm: function(desired) {
    return validateVersion(desired, 'npm --version', messages.npm)
  },
}

var errors = Object.keys(pkg.engines)
  .map(function(engine) {
    if (!validators[engine]) {
      throw new Error('Engine "' + engine + '" is unsupported.')
    }
    return validators[engine](pkg.engines[engine])
  })
  .filter(Boolean)

if (errors.length) {
  console.error(
    'There were errors validating the compatibility of this computer:',
  )
  console.error('\n    ' + errors.join('\n    ') + '\n\n')
  console.error(
    'If you would like to just ignore this error, then feel free to do so and install dependencies as you normally would in "' +
      cwd +
      '". Just know that things may not work properly if you do...',
  )

  process.exit(1)
}