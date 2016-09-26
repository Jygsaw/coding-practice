/*
  Write a function to find a value in an ordered set using O(log n) time
  and O(1) space.
*/
"use strict";

function searchOrderedSet(value, set) {
  if (typeof value !== "number") { return null; }
  if (!set) { return null; }

  let min = 0;
  let max = set.length - 1;

  do {
    let split = Math.floor((max + min) / 2);
    if (value === set[split]) {
      return split;
    } else {
      if (value < set[split]) {
        max = split - 1;
      } else {
        min = split + 1;
      }
    }
  } while (min <= max);

  return null;
}

console.log("===== Running: searchOrderedSet =====");
let testcases = [
  {
    value: null,
    set: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    expected: null,
  },
  {
    value: 5,
    set: null,
    expected: null,
  },
  {
    value: 5,
    set: [],
    expected: null,
  },
  {
    value: 0,
    set: [ 0 ],
    expected: 0,
  },
  {
    value: 5,
    set: [ 0 ],
    expected: null,
  },
  {
    value: 5,
    set: [ 0, 1 ],
    expected: null,
  },
  {
    value: 0,
    set: [ 0, 1 ],
    expected: 0,
  },
  {
    value: 1,
    set: [ 0, 1 ],
    expected: 1,
  },
  {
    value: 5,
    set: [ 0, 1, 2 ],
    expected: null,
  },
  {
    value: 0,
    set: [ 0, 1, 2 ],
    expected: 0,
  },
  {
    value: 1,
    set: [ 0, 1, 2 ],
    expected: 1,
  },
  {
    value: 2,
    set: [ 0, 1, 2 ],
    expected: 2,
  },
  {
    value: 0,
    set: [ 0, 1, 2, 3 ],
    expected: 0,
  },
  {
    value: 1,
    set: [ 0, 1, 2, 3 ],
    expected: 1,
  },
  {
    value: 2,
    set: [ 0, 1, 2, 3 ],
    expected: 2,
  },
  {
    value: 3,
    set: [ 0, 1, 2, 3 ],
    expected: 3,
  },
  {
    value: 0,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 0,
  },
  {
    value: 11,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 1,
  },
  {
    value: 21,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 2,
  },
  {
    value: 31,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 3,
  },
  {
    value: 41,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 4,
  },
  {
    value: 51,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 5,
  },
  {
    value: 61,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 6,
  },
  {
    value: 71,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 7,
  },
  {
    value: 81,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 8,
  },
  {
    value: 91,
    set: [ 0, 11, 21, 31, 41, 51, 61, 71, 81, 91 ],
    expected: 9,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  let result = searchOrderedSet(testcase.value, testcase.set);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("expected:", testcase.expected);
    console.log("actual:", result);
  }
});
