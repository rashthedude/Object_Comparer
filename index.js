const program = require('commander');
const _ = require('lodash');
const fs = require('fs');

program
    .version('1.0.0')
    .option('-i, --input [files]', 'first file')
    .option('-o, --output [files]', 'second file')
    .parse(process.argv)


let firstFile = program.input;
let secondFile = program.output;

let rawFirstFile = fs.readFileSync(firstFile);
let formattedFirstFile = JSON.parse(rawFirstFile);

let rawSecondFile = fs.readFileSync(secondFile);
let formattedSecondFile = JSON.parse(rawSecondFile);


function difference(formattedFirstFile, formattedSecondFile) {
	function changes(formattedFirstFile, formattedSecondFile) {
		return _.transform(formattedFirstFile, function(result, value, key) {
			if (!_.isEqual(value, formattedSecondFile[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(formattedFirstFile, formattedSecondFile);
}

if(!_.isEqual(formattedFirstFile, formattedSecondFile)) {
    console.log('diff: ', difference(formattedFirstFile, formattedSecondFile))
} else {
    console.log('Files are identical!!')
}