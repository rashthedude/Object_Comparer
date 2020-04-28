const program = require('commander');
const _ = require('lodash');

program
    .version('1.0.0')
    .option('-i, --input [files]', 'first file')
    .option('-o, --output [files]', 'second file')
    .parse(process.argv)


let firstFile = program.input;
let secondFile = program.output;

console.log(_.isEqual(firstFile, secondFile))''