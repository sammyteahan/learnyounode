/**
 * Synchronous Approach
 */
var fs = require('fs'),
    file = process.argv[2],
    buffer = fs.readFileSync(file),
    fileContents = buffer.toString(),
    fileLength = fileContents.split('\n');


/**
 * Print line length of file
 */
console.log(fileLength.length - 1);

