var fs = require('fs'),
    filename = process.argv[2];
/**
 * Print line length of file
 */
file = fs.readFile(filename, function(err, data) {
  console.log(data.toString().split('\n').length - 1);
});

