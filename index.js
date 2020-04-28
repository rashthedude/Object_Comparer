const program = require('commander');
const _ = require('lodash');

program
    .version('1.0.0')
    .option('-i, --input [files]', 'first file')
    .option('-o, --output [files]', 'second file')
    .parse(process.argv)


let firstFile = program.input;
let secondFile = program.output;

// console.log(_.isEqual(firstFile, secondFile));

if(!_.isEqual(firstFile, secondFile)) {
    let yo = _.reduce(firstFile, function(result, value, key) {
        return _.isEqual(value, secondFile[key]) ?
            result : result.concat(key);
    }, []);
    console.log('Here is the diff: ', yo)
} else {
    console.log('Files are identical!!')
}