/*
  Write a function to determine whether a specific sum can be computed
  from a given set of integers.
*/
"use strict";

let perfectSum = function (target, nums) {
  if (typeof target !== "number") { return null; }
  if (!nums || nums.length === 0) { return null; }

  let tracker = {};

  return nums.some(num => {
    let remainder = target - num;
    if (tracker[remainder]) {
      // paired movie found
      return true;
    } else {
      // registering movie length
      tracker[num] = (tracker[num] || 0) + 1;
    }
  });
};

let perfectSumBrute = function (target, nums) {
  if (typeof target !== "number") { return null; }
  if (!nums || nums.length === 0) { return null; }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] + nums[j] === target) {
        return true;
      }
    }
  }

  return false;
};

console.log("===== Running: perfectSum =====");
let testcases = [
  {
    target: null,
    nums: [ 1 ],
    expected: null,
  },
  {
    target: 1,
    nums: null,
    expected: null,
  },
  {
    target: 1,
    nums: undefined,
    expected: null,
  },
  {
    target: 1,
    nums: [],
    expected: null,
  },
  {
    target: 1,
    nums: [ 1 ],
    expected: false,
  },
  {
    target: 2,
    nums: [ 1, 1 ],
    expected: true,
  },
  {
    target: 5,
    nums: [ 12, 2, 8, 3, 1, 7 ],
    expected: true,
  },
  {
    target: 6,
    nums: [ 12, 2, 3, 8, 3, 1, 7 ],
    expected: true,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  let result = perfectSum(testcase.target, testcase.nums);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("expected:", testcase.expected);
    console.log("actual:", result);
  }
});
