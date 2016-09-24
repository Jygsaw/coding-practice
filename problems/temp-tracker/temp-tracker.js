/*
  Implement the class TempTracker with methods:
  - insert()
  - getMax()
  - getMin()
  - getMean()
  - getMode()

  Optimize for space and time, and favor speeding up getter functions over insertion.

  Temperatures will all be in Fahrenheit integers (ie. 0..110).

  If there is more than one mode, return any mode.
*/
"use strict";

let TrackerFactory = function () {
  let TrackerProto = {
    insert: function (temp) {

      // track max and min
      if (temp > this.max || this.max === null) {
        this.max = temp;
      }
      if (temp < this.min || this.min === null) {
        this.min = temp;
      }

      // calculate mean
      this.count += 1;
      if (this.mean === null) {
        this.mean = temp;
      } else {
        this.mean = this.mean * ((this.count - 1) / this.count) +
                    temp * (1 / this.count);
      }

      // track mode
      this.modeCnt[temp] = (this.modeCnt[temp] || 0) + 1;
      if (this.mode === null) {
        this.mode = temp;
      } else if (this.modeCnt[temp] > this.modeCnt[this.mode]) {
        this.mode = temp;
      }
    },
    getMax: function () {
      return this.max;
    },
    getMin: function () {
      return this.min;
    },
    getMean: function () {
      return this.mean;
    },
    getMode: function () {
      return this.mode;
    },
  };

  return Object.assign(Object.create(TrackerProto), {
    count: 0,
    modeCnt: {},
    max: null,
    min: null,
    mean: null,
    mode: null,
  });
};

console.log("===== Running: TempTracker =====");
let tracker = TrackerFactory();
let testcases = [
  {
    action: () => {},
    verify: () => {
      if (tracker.getMax() === null &&
          tracker.getMin() === null &&
          tracker.getMean() === null &&
          tracker.getMode() === null) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(6); },
    verify: () => {
      if (tracker.getMax() === 6 &&
          tracker.getMin() === 6 &&
          tracker.getMean() === 6 &&
          tracker.getMode() === 6) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(2); },
    verify: () => {
      if (tracker.getMax() === 6 &&
          tracker.getMin() === 2 &&
          tracker.getMean() === 4 &&
          tracker.getMode() === 6) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(8); },
    verify: () => {
      if (tracker.getMax() === 8 &&
          tracker.getMin() === 2 &&
          tracker.getMode() === 6) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(12); },
    verify: () => {
      if (tracker.getMax() === 12 &&
          tracker.getMin() === 2 &&
          tracker.getMean() === 7 &&
          tracker.getMode() === 6) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(8); },
    verify: () => {
      if (tracker.getMax() === 12 &&
          tracker.getMin() === 2 &&
          tracker.getMode() === 8) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(2); },
    verify: () => {
      if (tracker.getMax() === 12 &&
          tracker.getMin() === 2 &&
          tracker.getMode() === 8) {
        return true;
      }
      return false;
    },
  },
  {
    action: () => { tracker.insert(2); },
    verify: () => {
      if (tracker.getMax() === 12 &&
          tracker.getMin() === 2 &&
          tracker.getMode() === 2) {
        return true;
      }
      return false;
    },
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  console.log("action:", testcase.action);
  testcase.action();
  if (testcase.verify()) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("tracker:", JSON.stringify(tracker, null, 2));
  }
});
