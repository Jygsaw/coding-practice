/*
  Assume a meeting is described by an object containing a start time and an end time.
  Given an array of meeting times, write a function to merge meeting times into contiguous blocks.
*/
"use strict";

function meetingBlocks(meetings) {
  if (meetings.length === 0) { return []; }

  let result = [];

  // sort meetings
  meetings = meetings.sort((a, b) => {
    return a.startTime - b.startTime;
  });

  // merge meetings
  let block = {
    startTime: meetings[0].startTime,
    endTime: meetings[0].endTime,
  };
  for (let i = 1; i < meetings.length; i++) {
    if (block.endTime < meetings[i].startTime) {
      result.push(block);
      block = {
        startTime: meetings[i].startTime,
        endTime: meetings[i].endTime,
      };
    } else if (block.endTime < meetings[i].endTime) {
      block.endTime = meetings[i].endTime;
    }
  }
  result.push(block);

  return result;
}

console.log("===== Running: meetingBlocks =====");
let testcases = [
  {
    input: [],
    expected: [],
  },
  {
    input: [
      { startTime: 2, endTime: 3 },
    ],
    expected: [
      { startTime: 2, endTime: 3 },
    ],
  },
  {
    input: [
      { startTime: 2, endTime: 3 },
      { startTime: 6, endTime: 9 },
    ],
    expected: [
      { startTime: 2, endTime: 3 },
      { startTime: 6, endTime: 9 },
    ],
  },
  {
    input: [
      { startTime: 2, endTime: 4 },
      { startTime: 3, endTime: 5 },
    ],
    expected: [
      { startTime: 2, endTime: 5 },
    ],
  },
  {
    input: [
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 5 },
      { startTime: 4, endTime: 8 },
      { startTime: 9, endTime: 10 },
      { startTime: 10, endTime: 12 },
    ],
    expected: [
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 8 },
      { startTime: 9, endTime: 12 },
    ],
  },
  {
    input: [
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 5 },
      { startTime: 4, endTime: 8 },
      { startTime: 10, endTime: 12 },
      { startTime: 9, endTime: 10 },
    ],
    expected: [
      { startTime: 0, endTime: 1 },
      { startTime: 3, endTime: 8 },
      { startTime: 9, endTime: 12 },
    ],
  },
  {
    input: [
      { startTime: 0, endTime: 5 },
      { startTime: 1, endTime: 2 },
      { startTime: 3, endTime: 4 },
    ],
    expected: [
      { startTime: 0, endTime: 5 },
    ],
  },
  {
    input: [
      { startTime: 1, endTime: 2 },
      { startTime: 2, endTime: 3 },
    ],
    expected: [
      { startTime: 1, endTime: 3 },
    ],
  },
  {
    input: [
      { startTime: 1, endTime: 10 },
      { startTime: 2, endTime: 6 },
      { startTime: 3, endTime: 5 },
      { startTime: 7, endTime: 9 },
    ],
    expected: [
      { startTime: 1, endTime: 10 },
    ],
  },
];
testcases.forEach(function(testcase) {
  let result = meetingBlocks(testcase.input);
  console.log("========== TESTCASE ==========");
  if (JSON.stringify(testcase.expected) === JSON.stringify(result)) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log("input:", JSON.stringify(testcase.input, null, 2));
    console.log("expected:", JSON.stringify(testcase.expected, null, 2));
    console.log("actual:", JSON.stringify(result, null, 2));
    console.log(">>> FAILURE!!! <<<");
  }
});
