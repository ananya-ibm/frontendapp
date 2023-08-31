/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const parse = (s) => {
  if (s[0] !== '(') throw new Error('Expecting (, got ' + s.substring(0, 5));
  if (s[s.length - 1] !== ')') throw new Error('Expecting (, got ' + s.substring(0, 5) + ' - ' + s[s.length - 1]);

  let idx = 1;

  let obj = {};

  let curKey = '';
  let curValue;

  do {
    if (idx > s.length) return obj; // throw new Error();
    if (s[idx] === ')') {
      if (curKey !== '') obj[curKey] = curValue;
      return obj;

    } else if (s[idx] === ':') {
      idx++;

      const startOfValue = idx;

      // Find eager end...
      let d = 0;
      while (idx < s.length) {
        if (d === 0 && s[idx] === ':') break;
        if (s[idx] === '(') d++;
        if (s[idx] === ')') d--;
        idx++;
      }

      if (s[idx] === ':') {
        while(s[idx] !== ',') idx--;
      } else {
        idx--;
      }

      const valueString = s.substring(startOfValue, idx).trim();
      obj[curKey.trim()] = valueString[0] === '(' ? parse(valueString) : valueString;
      curKey = '';

    } else if (s[idx] === ',') {
      // ignore
    } else {
      curKey += s[idx];
    }

  } while (idx++);
}

let output = '';

process.stdin.on('data', function(chunk) {
  output += chunk;
});

process.stdin.on('end', function() {
  const lines = output.split('\n');
  for (let i = 0; i < lines.length - 1; i+=6) {
    const [,name] = lines[i].split('DEBUG: ');

    console.log(lines[i].substring(0, 40));
    console.log(lines[i + 1].substring(0, 40));
    console.log(lines[i + 2].substring(0, 40));
    console.log(lines[i + 3].substring(0, 40));
    console.log(lines[i + 4].substring(0, 40));
    console.log(lines[i + 5].substring(0, 40));
    console.log('')

    let obj = {};
    obj = { ...obj, ...parse(lines[i + 1].split('DEBUG: ')[1]) };
    obj = { ...obj, ...parse(lines[i + 2].split('DEBUG: ')[1]) };
    obj = { ...obj, ...parse(lines[i + 3].split('DEBUG: ')[1]) };
    obj = { ...obj, ...parse(lines[i + 4].split('DEBUG: ')[1]) };
    obj = { ...obj, ...parse(lines[i + 5].split('DEBUG: ')[1]) };

    fs.writeFileSync(`theme-${name}.ts`, `export const ${name} = ${JSON.stringify(obj, undefined, "  ")}`);
  }
});