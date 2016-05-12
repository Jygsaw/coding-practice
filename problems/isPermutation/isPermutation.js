/*
  Write a function isPermutation, which is passed two strings and returns true if one is a permuation of the other.  For example, isPermutation('abc', 'cba') returns true.
  The time complexity for this function should be O(n).

  Input Format:
  - Two Strings

  Output Format:
  - Boolean: true or false

  Example:
  - isPermutation('abc, cbe') => false
*/
function isPermutation(a, b) {
  // initialize variables
  a = a === null ? '' : a.toString();
  b = b === null ? '' : b.toString();
  var counts = {};

  a.split('').forEach(function (char) {
    counts[char] = (counts[char] || 0) + 1;
  });

  b.split('').forEach(function (char) {
    counts[char] = (counts[char] || 0) - 1;
  });

  for (var char in counts) {
    if (counts[char] !== 0) {
      return false;
    }
  };

  return true;
}

var testcases = [
  {
    a: null,
    b: null,
    out: true,
  },
  {
    a: null,
    b: 'abc',
    out: false,
  },
  {
    a: 'abc',
    b: null,
    out: false,
  },
  {
    a: 'null',
    b: null,
    out: false,
  },
  {
    a: '',
    b: '',
    out: true,
  },
  {
    a: 'abc',
    b: '',
    out: false,
  },
  {
    a: '',
    b: 'abc',
    out: false,
  },
  {
    a: 'abc',
    b: 'abc',
    out: true,
  },
  {
    a: 'abc',
    b: 'cba',
    out: true,
  },
  {
    a: 'abac',
    b: 'acba',
    out: true,
  },
  {
    a: 'abc',
    b: 'cbe',
    out: false,
  },
  {
    a: 'abcb',
    b: 'cbbe',
    out: false,
  },
  {
    a: 0,
    b: 0,
    out: true,
  },
  {
    a: 3757,
    b: 7735,
    out: true,
  },
  {
    a: 357,
    b: 735,
    out: true,
  },
  {
    a: 0257,
    b: 2045,
    out: false,
  },
  {
    a: 02557,
    b: 25045,
    out: false,
  },
];
console.log("===== Testcases =====");
testcases.forEach(function (testcase) {
  // console.log(">>> executing testcase <<<");
  // console.log("a:", JSON.stringify(testcase.a));
  // console.log("b:", JSON.stringify(testcase.b));
  // console.log("expected:", testcase.out);

  var isPerm = isPermutation(testcase.a, testcase.b);
  // console.log("actual:", isPerm);
  if (testcase.out === isPerm) {
    console.log("> PASSED");
  } else {
    console.log("> FAILED");
  }
});
