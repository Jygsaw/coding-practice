/*
  Given an amount of money and an array of coin denominations, write a
  function that computes the number of ways to make change.
*/
"use strict";

let changeWays = function (value, coins) {
  if (value < 0) { return 0; }
  if (value === 0) { return 1; }
  if (coins.length === 0) { return 0; }

  let ways = 0;
  for (let i = 0; i < coins.length; i++) {
    let remainder = value;
    while (remainder >= coins[i]) {
      remainder -= coins[i];
      ways += changeWays(remainder, coins.slice(i + 1));
    }
  }

  return ways;
}

let changeWaysMemo = (function () {
  let stash = {};

  let memo = function (value, coins) {
    let key = JSON.stringify([value, coins]);
    let result = stash[key];

    if (typeof result !== "number") {
      result = (function (value, coins) {
        if (value < 0) { return 0; }
        if (value === 0) { return 1; }
        if (coins.length === 0) { return 0; }

        let ways = 0;
        for (let i = 0; i < coins.length; i++) {
          let remainder = value;
          while (remainder >= coins[i]) {
            remainder -= coins[i];
            ways += changeWaysMemo(remainder, coins.slice(i + 1));
          }
        }

        return ways;
      }(value, coins));
      stash[key] = result;
    }

    return result;
  };

  return memo;
}());

let changeWaysDyna = function (value, coins) {
  let changeWaysN = Array(value + 1).fill(0);
  changeWaysN[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    for (let j = coin; j <= value; j++) {
      var remainder = j - coin;
      changeWaysN[j] += changeWaysN[remainder];
    }
  }

  return changeWaysN[value];
}

console.log("===== Running: changeWays =====");
let testcases = [
  {
    value: 0,
    coins: [],
    expected: 1,
  },
  {
    value: 0,
    coins: [ 1 ],
    expected: 1,
  },
  {
    value: 1,
    coins: [ 1 ],
    expected: 1,
  },
  {
    value: 5,
    coins: [ 5, 1 ],
    expected: 2,
  },
  {
    value: 7,
    coins: [ 5, 1 ],
    expected: 2,
  },
  {
    value: 10,
    coins: [ 5, 1 ],
    expected: 3,
  },
  {
    value: 10,
    coins: [ 10, 5, 1 ],
    expected: 4,
  },
  {
    value: 15,
    coins: [ 10, 5, 1 ],
    expected: 6,
  },
  {
    value: 20,
    coins: [ 10, 5, 1 ],
    expected: 9,
  },
  {
    value: 15,
    coins: [ 10, 5 ],
    expected: 2,
  },
  {
    value: 25,
    coins: [ 10, 5, 1],
    expected: 12,
  },
  {
    value: 25,
    coins: [ 10, 5 ],
    expected: 3,
  },
  {
    value: 26,
    coins: [ 10, 5 ],
    expected: 0,
  },
  {
    value: 4,
    coins: [ 3, 2, 1 ],
    expected: 4,
  },
  {
    value: 5,
    coins: [ 1, 3, 5],
    expected: 3,
  },
];
testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  console.log("args:", testcase.value, testcase.coins);
  let result = changeWaysDyna(testcase.value, testcase.coins);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log("expected:", testcase.expected);
    console.log("actual:", result);
    console.log(">>> FAILURE!!! <<<");
  }
});
