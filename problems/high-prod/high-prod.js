/*
  Given an array of at least three integers, find the highest product of three numbers.
*/
"use strict";

function highProd(numbers) {
  if (numbers.length < 3) {
    throw new Error("At least three integers required");
  }

  // scan for top positive and negative numbers
  let highPos = [];
  let lowNeg = [];
  let highNeg = [];
  numbers.forEach(number => {
    // track highest positve or lowest negative numbers
    let stash = number >= 0 ? highPos : lowNeg;
    let value = number >= 0 ? number : number * -1;
    let numProducts = 3;
    let spliceIndex = null;
    for (let i = 0; i < numProducts; i++) {
      if (stash[i] === undefined || value > stash[i]) {
        spliceIndex = i;
        break;
      }
    }
    if (spliceIndex !== null) {
      stash.splice(spliceIndex, 0, value);
    }

    // track highest negative
    if (number < 0) {
      let spliceIndex = null;
      for (let i = 0; i < numProducts; i++) {
        if (highNeg[i] === undefined || number > highNeg[i]) {
          spliceIndex = 1;
          break;
        }
      }
      if (spliceIndex !== null) {
        highNeg.splice(spliceIndex, 0, number);
      }
    }
  });

  // find highest scenario
  let scenarios = [
    highPos[0] * highPos[1] * highPos[2],
    highPos[0] * highPos[1] * highNeg[0],
    highPos[0] * lowNeg[0] * lowNeg[1],
    highNeg[0] * highNeg[1] * highNeg[2],
  ];
  let result = null;
  scenarios.forEach(product => {
    if (!isNaN(product)) {
      if (result === null || product > result) {
        result = product;
      }
    }
  });

  return result;
}

console.log("===== Running: highProd =====");
let testcases = [
  {
    input: [1, 2, 3],
    expected: 3 * 2 * 1,
  },
  {
    input: [1, 2, 3, 4],
    expected: 4 * 3 * 2,
  },
  {
    input: [4, 2, 3, 1],
    expected: 4 * 3 * 2,
  },
  {
    input: [4, 2, -3, 1],
    expected: 4 * 2 * 1,
  },
  {
    input: [4, 2, -3, 1, -5],
    expected: -5 * -3 * 4,
  },
  {
    input: [-1, -2, -3],
    expected: -1 * -2 * -3,
  },
  {
    input: [-1, -2, -3, -4, -5],
    expected: -1 * -2 * -3,
  },
  {
    input: [1, 2, 6, 5, 9],
    expected: 9 * 5 * 6,
  },
  {
    input: [-1, 7, -3, 0, 4],
    expected: 7 * -3 * -1,
  },
  {
    input: [-1, 7, 3, 0],
    expected: 7 * 3 * 0,
  },
  {
    input: [-1, -7, -3, 0, 0],
    expected: 0 * 0 * -1,
  },
  {
    input: [1, 0, 7, 3, 0, 4],
    expected: 7 * 4 * 3,
  },
  {
    input: [7, -1, 4],
    expected: -28,
  },
  {
    input: [4, 5, 6],
    expected: 6 * 5 * 4,
  },
  {
    input: [ 4, 6, 2, -9, 5, 7],
    expected: 7 * 6 * 5,
  },
  {
    input: [ 4, 6, 2, 9, 5, -7],
    expected: 9 * 6 * 5,
  },
  {
    input: [ 4, 6, 2, -9, 5, -7],
    expected: -9 * -7 * 6,
  },
  {
    input: [ -4, -6, -2, -9, -5, -7],
    expected: -2 * -4 * -5,
  },
  {
    input: [ -10, -10, 1, 3, 2],
    expected: -10 * -10 * 3,
  },
];
testcases.forEach(function(testcase) {
  let result = highProd(testcase.input);
  console.log(">>> numbers:", testcase.input);
  console.log("expected:", testcase.expected);
  console.log("actual:", result);
  if (testcase.expected === result) {
    console.log("SUCCESS!");
  } else {
    console.log("FAILURE!!!");
  }
});
