/*
  You have an array of integers, and for each index you want to find the product of every integer except the integer at the index.

  Write a function productsExceptIndex() that takes an array of integers and returns an array of the products.

  For example, given:
  [1, 7, 3, 4]

  your function would return:
  [84, 12, 28, 21]

  by calculating:
  [7 * 3 * 4, 1 * 3 * 4, 1 * 7 * 4, 1 * 7 * 3]

  Do not use division in your solution.
*/
"use strict";

let equality = require("../../utils/equality.js");

function productsExceptIndex(nums) {
  return solution(nums);
  // return OnSolutionV2(nums);
  // return OnSolution(nums);
  // return On2Solution(nums);
}

function solution(nums) {
  let products = [];
  let tracker = null;

  tracker = 1;
  for (let i = 0; i < nums.length; i++) {
    products[i] = tracker;
    // note: official solution bothers me because logic for next loop
    //       depends on side effect of current loop
    tracker *= nums[i];
  }

  tracker = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    products[i] *= tracker;
    // note: official solution bothers me because logic for next loop
    //       depends on side effect of current loop
    tracker *= nums[i];
  }

  return products;
}

function OnSolutionV2(nums) {
  let products = [];
  let product = 1;
  let zeroIndex = null;

  // first pass to calculate product and mark zeros
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      if (zeroIndex !== null) {
        // more than one zero means products always 0
        return Array(nums.length).fill(0);
      } else {
        // mark zero index and skip product aggregation
        zeroIndex = i;
      }
    } else {
      product *= nums[i];
    }
  }

  if (zeroIndex !== null) {
    // one zero so all products are zero except at zero index
    products = Array(nums.length).fill(0);
    products[zeroIndex] = product;
  } else {
    for (let i = 0; i < nums.length; i++) {
      products[i] = product / nums[i];
    }
  }

  return products;
}

function OnSolution(nums) {
  let products = [];
  let tracker = null;

  // calculate products before index
  tracker = 1;
  for (let i = 0; i < nums.length; i++) {
    // mote: index check to prevent out of range error
    if (i > 0) {
      tracker *= nums[i - 1];
    }
    products[i] = tracker;
  }

  // multiply by products after index
  tracker = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    // note: index check to prevent out of range error
    if (i < nums.length - 1) {
      tracker *= nums[i + 1];
    }
    products[i] *= tracker;
  }

  return products;
}

function On2Solution(nums) {
  let products = [];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (j !== i) {
        product *= nums[j];
      }
    }
    products.push(product);
  }
  return products;
}

console.log("===== Running: productsExceptIndex =====");
let testcases = [
  {
    input: [1, 7, 3, 4],
    expected: [84, 12, 28, 21],
  },
  {
    input: [1, 2, 6, 5, 9],
    expected: [540, 270, 90, 108, 60],
  },
  {
    input: [1, 7, 3, 0, 4],
    expected: [0, 0, 0, 84, 0],
  },
  {
    input: [1, 0, 7, 3, 0, 4],
    expected: [0, 0, 0, 0, 0, 0],
  },
  {
    input: [],
    expected: [],
  },
];
testcases.forEach(function(testcase) {
  let result = productsExceptIndex(testcase.input);
  console.log(">>> numbers:", testcase.input);
  console.log("expected:", testcase.expected);
  console.log("actual:", result);
  if (equality.arrays(result, testcase.expected)) {
    console.log("SUCCESS!");
  } else {
    console.log("FAILURE!!!");
  }
});
