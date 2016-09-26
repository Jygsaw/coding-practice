/*
  Write a function to find the rotation point of a rotated ordered list.
*/
"use strict";

let findRotation = function (list) {
  if (!list || list.length < 1) { return null; }

  let min = 0;
  let max = list.length - 1;

  do {
    let split = Math.floor((min + max) / 2);
    if (list[split] < list[split - 1]) {
      // rotation point found
      return split;
    }

    if (list[split] < list[min]) {
      // rotation in left half
      max = split - 1;
    } else if (list[split] > list[max]) {
      // rotation in right half
      min = split + 1;
    } else {
      // list has no rotation
      return min;
    }
  } while (min <= max);
};

console.log("===== Running: findRotation =====");
let testcases = [
  {
    list: null,
    expected: null,
  },
  {
    list: [],
    expected: null,
  },
  {
    list: [ 0 ],
    expected: 0,
  },
  {
    list: [ 0, 1 ],
    expected: 0,
  },
  {
    list: [ 1, 0 ],
    expected: 1,
  },
  {
    list: [ 0, 1, 2 ],
    expected: 0,
  },
  {
    list: [ 2, 0, 1 ],
    expected: 1,
  },
  {
    list: [ 1, 2, 0 ],
    expected: 2,
  },
  {
    list: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    expected: 0,
  },
  {
    list: [ 9, 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    expected: 1,
  },
  {
    list: [ 8, 9, 0, 1, 2, 3, 4, 5, 6, 7 ],
    expected: 2,
  },
  {
    list: [ 7, 8, 9, 0, 1, 2, 3, 4, 5, 6 ],
    expected: 3,
  },
  {
    list: [ 6, 7, 8, 9, 0, 1, 2, 3, 4, 5 ],
    expected: 4,
  },
  {
    list: [ 5, 6, 7, 8, 9, 0, 1, 2, 3, 4 ],
    expected: 5,
  },
  {
    list: [ 4, 5, 6, 7, 8, 9, 0, 1, 2, 3 ],
    expected: 6,
  },
  {
    list: [ 3, 4, 5, 6, 7, 8, 9, 0, 1, 2 ],
    expected: 7,
  },
  {
    list: [ 2, 3, 4, 5, 6, 7, 8, 9, 0, 1 ],
    expected: 8,
  },
  {
    list: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ],
    expected: 9,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  let result = findRotation(testcase.list);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("expected:", testcase.expected);
    console.log("actual:", result);
  }
});
