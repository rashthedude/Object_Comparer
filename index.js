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


const difference = (formattedFirstFile, formattedSecondFile) => {
	function changes(formattedFirstFile, formattedSecondFile) {
		return _.transform(formattedFirstFile, function(result, value, key) {
			if (!_.isEqual(value, formattedSecondFile[key])) {
				result[key] = (_.isObject(value) && _.isObject(formattedFirstFile[key])) ? changes(value, formattedFirstFile[key]) : value;
			}
		});
	}
	return changes(formattedFirstFile, formattedSecondFile);
}

if(!_.isEqual(formattedFirstFile, formattedSecondFile)) {
    log(chalk.red('Diff: '), difference(formattedFirstFile, formattedSecondFile));
} else {
    log(chalk.green('Files are identical!!'));
}