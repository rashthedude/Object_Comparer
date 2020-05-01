const program = require('commander');
const _ = require('lodash');
const fs = require('fs');
chalk = require('chalk');
log = console.log;

program
    .version('1.0.0')
    .option('-f, --first [files]', 'first file')
    .option('-s, --second [files]', 'second file')
    .parse(process.argv)


let firstFile = program.first;
let secondFile = program.second;

let rawFirstFile = fs.readFileSync(firstFile);
let formattedFirstFile = JSON.parse(rawFirstFile);

let rawSecondFile = fs.readFileSync(secondFile);
let formattedSecondFile = JSON.parse(rawSecondFile);


function get(obj, path) {
	return path.split('.').reduce((r, e) => {
	  if (!r) return r;
	  else return r[e] || undefined;
	}, obj);
  }
  
  function isEmpty(o) {
	if (typeof o !== 'object') return true;
	else return !Object.keys(o).length;
  }
  
  function build(a, b, o = null, prev = '') {
	return Object.keys(a).reduce(
	  (r, e) => {
		const path = prev + (prev ? '.' + e : e);
		const bObj = get(b, path);
		const value = a[e] === bObj;
  
		if (typeof a[e] === 'object') {
		  if (isEmpty(a[e]) && isEmpty(bObj)) {
			if (e in r) r[e] = r[e];
			else r[e] = true;
		  } else if (!bObj && isEmpty(a[e])) {
			r[e] = value;
		  } else {
			r[e] = build(a[e], b, r[e], path);
		  }
		} else {
		  r[e] = value;
		}
		return r;
	  },
	  o ? o : {}
	);
  }
  
  function compare(a, b) {
	const o = build(a, b);
	return build(b, a, o);
  }


if(!_.isEqual(formattedFirstFile, formattedSecondFile)) {
    log(chalk.red('Diff: '), compare(formattedFirstFile, formattedSecondFile));
} else {
    log(chalk.green('Files are identical!!'));
}