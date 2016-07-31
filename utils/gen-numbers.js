var genNumArray = function(numElems, maxRange) {
  // initializing variables
  numElems = numElems ? numElems : 10;
  maxRange = maxRange ? maxRange : 100;

  // building output array of random ints
  var nums = [];
  for (var i = 0; i < numElems; i++) {
    nums.push(genRandInt(maxRange));
  }
  return nums;
}

// generate random integer inclusive of max range
var genRandInt = function(maxRange) {
  return Math.floor(Math.random() * (maxRange + 1));
}

module.exports = {
  genNumArray: genNumArray,
  genRandInt: genRandInt,
};
