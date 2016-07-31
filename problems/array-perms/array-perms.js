/**
  * Write a function to find all permuations of a given array
  * Given:
  * - flat array of string values
  * Returns:
  * - array of array permutations
  */
var inputSize = process.argv[2] || 3;
var inputArray = createInputArray(inputSize);

function createInputArray(size) {
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return size ? letters.slice(0, size) : [];
}

function findArrayPerms(input) {
  if (input.length <= 1) {
    return [input];
  }

  var perms = [];
  for (var i = 0; i < input.length; i++) {
    var pick = input[i];
    var remainder = input.slice();
    remainder.splice(i, 1);

    findArrayPerms(remainder).forEach(function (elem) {
      perms.push([pick].concat(elem));
    });
  }

  return perms;
}

console.log("===== Running: arrayPerms =====");
console.log("inputArray:", inputArray);
findArrayPerms(inputArray).forEach(function (elem) {
  console.log("perm:", elem);
});
