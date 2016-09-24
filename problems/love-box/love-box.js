/*
  Given two rectangles, find the intersection.
*/
"use strict";

let loveBox = function (first, second) {
  // verify args
  if (!first || !second) {
    throw new Error("Missing argument");
  }
  [first, second].forEach(box => {
    if (!box.hasOwnProperty("leftX") ||
        !box.hasOwnProperty("bottomY") ||
        !box.hasOwnProperty("width") ||
        !box.hasOwnProperty("height")) {
      throw new Error(`Invalid argument: ${JSON.stringify(box)}`);
    }
  });

  // convert rectangle format
  let A = {
    left: first.leftX,
    right: first.leftX + first.width,
    top: first.bottomY + first.height,
    bottom: first.bottomY,
  };
  let B = {
    left: second.leftX,
    right: second.leftX + second.width,
    top: second.bottomY + second.height,
    bottom: second.bottomY,
  };

  // calculate intersection
  let intersect = {
    left: Math.max(A.left, B.left),
    right: Math.min(A.right, B.right),
    top: Math.min(A.top, B.top),
    bottom: Math.max(A.bottom, B.bottom),
  };

  // verify edge cases
  if (intersect.left > A.right || // X disconnect
      intersect.left > B.right || // X disconnect
      intersect.top < A.bottom || // Y disconnect
      intersect.top < B.bottom || // Y disconnect
      intersect.right - intersect.left < 1 || // line or point
      intersect.top - intersect.bottom < 1) { // line or point
    return null;
  }

  // translate result
  let result = {
    leftX: intersect.left,
    bottomY: intersect.bottom,
    width: intersect.right - intersect.left,
    height: intersect.top - intersect.bottom,
  };

  return result;
}

console.log("===== Running: loveBox =====");
let testcases = [
  // {
  //   A: null,
  //   B: null,
  //   expected: null,
  // },
  // {
  //   A: {
  //     left: 0,
  //     right: 5,
  //     top: 5,
  //     bottom: 0,
  //   },
  //   B: {},
  //   expected: null,
  // },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 2,
      bottomY: 2,
      width: 5,
      height: 5,
    },
    expected: {
      leftX: 2,
      bottomY: 2,
      width: 3,
      height: 3,
    },
  },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 6,
      bottomY: 2,
      width: 5,
      height: 5,
    },
    expected: null,
  },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 2,
      bottomY: 6,
      width: 5,
      height: 5,
    },
    expected: null,
  },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 2,
      bottomY: 2,
      width: 2,
      height: 2,
    },
    expected: {
      leftX: 2,
      bottomY: 2,
      width: 2,
      height: 2,
    },
  },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 5,
      bottomY: 5,
      width: 2,
      height: 2,
    },
    expected: null,
  },
  {
    A: {
      leftX: 0,
      bottomY: 0,
      width: 5,
      height: 5,
    },
    B: {
      leftX: 5,
      bottomY: 2,
      width: 5,
      height: 5,
    },
    expected: null,
  },
];
testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  console.log("args:", testcase.A, testcase.B);
  let expected = JSON.stringify(testcase.expected);
  let result = JSON.stringify(loveBox(testcase.A, testcase.B));
  if (expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log("expected:", expected);
    console.log("actual:", result);
    console.log(">>> FAILURE!!! <<<");
  }
});
