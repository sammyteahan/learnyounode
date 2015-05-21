/**
 * Baby Steps
 */

var total = 0;

// Loop through command line arguments
// process.argv gives us an array of strings
// that were passed through the command line
for(var i = 2; i < process.argv.length; i++) {
  total += Number(process.argv[i]);
}

console.log(total);
