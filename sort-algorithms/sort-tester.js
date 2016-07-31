var sortTester = function (type, size) {
  console.log("===== Testing:", type, "=====");
  var sortFunc = require('./' + type + '/' + type + '.js');
  var numUtils = require('../utils/gen-numbers.js');

  // generate random numbers
  console.log(">>> generating numbers <<<");
  var nums = numUtils.genNumArray(size || 10);
  console.log("unsorted:", nums);

  // sort numbers
  console.log(">>> sorting numbers <<<");
  var sorted = sortFunc(nums);
  console.log("sorted:", sorted);

  // verify results
  console.log(">>> verifying sort <<<");
  var verify = nums.slice().sort(function (a, b) {
    return a - b;
  });
  console.log("unsorted:", nums);
  console.log("verify:", verify);
  if (sorted.length === verify.length &&
      sorted.every(function (elem, index) {
        return elem === verify[index];
      })) {
    console.log(">>> sort: SUCCESS <<<");
  } else {
    console.log(">>> sort: FAIL <<<");
  }
};

module.exports = sortTester;
