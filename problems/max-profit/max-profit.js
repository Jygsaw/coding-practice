/*
  Suppose we could access yesterday's stock prices as an array, where:
  - The indices are the time in minutes past trade opening time, which was 9:30am local time.
  - The values are the price in dollars of Apple stock at that time.
  So, if the stockc cost $500 at 10:30am, stockPricesYesterday[60] = 500.

  Write an efficient function that takes stockPricesYesterday and returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.

  For example:
  var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
  getMaxProfit(stockPricesYesterdaty)

  // returns 6 (buying for $5 and selling for $11)

  No shorting - you must buy before you sell.  You may not buy and sell in the same time step (at least 1 minute must pass).
*/
"use strict";

function maxProfit(prices) {
  if (prices.length < 2) {
    return "Error: Minimum of 2 prices required";
  }

  // return solution(prices);
  return OnSolutionV2(prices);
  // return OnSolution(prices);
  // return On2Solution(prices);
}

function solution(prices) {
  var minPrice = prices[0];
  var maxProfit = prices[1] - prices[0];

  for (let i = 1; i < prices.length; i++) {
    var currPrice = prices[i];
    var potentialProfit = currPrice - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
    minPrice = Math.min(minPrice, currPrice);
  }

  return maxProfit;
}

function OnSolutionV2(prices) {
  let markers = {
    bestBuy: null,
    bestSell: null,
    minPrice: null,
  };

  prices.reduce((agg, curr) => {
    if (agg.bestBuy === null) {
      agg.bestBuy = curr;
      agg.minPrice = curr;
    } else if (agg.bestSell === null) {
      agg.bestSell = curr;
    } else if (curr - agg.minPrice > agg.bestSell - agg.bestBuy) {
      agg.bestBuy = agg.minPrice;
      agg.bestSell = curr;
    }

    agg.minPrice = Math.min(agg.minPrice, curr);

    return agg;
  }, markers);

  return markers.bestSell - markers.bestBuy;
}

function OnSolution(prices) {
  let markers = {
    bestBuy: null,
    bestSell: null,
    newBuy: null,
    newSell: null,
  };

  prices.reduce((agg, curr) => {
    if (agg.bestBuy === null) {
      agg.bestBuy = curr;
    } else if (agg.bestSell === null) {
      agg.bestSell = curr;
    } else if (curr - agg.bestBuy > agg.bestSell - agg.bestBuy) {
      agg.bestSell = curr;
    }

    if (agg.newBuy === null) {
      agg.newBuy = curr;
    } else if (agg.newSell === null) {
      agg.newSell = curr;
    } else if (curr - agg.newBuy > agg.newSell - agg.newBuy) {
      agg.newSell = curr;
    }

    if (agg.newSell - agg.newBuy > agg.bestSell - agg.bestBuy &&
        agg.bestBuy !== null && agg.bestSell !== null &&
        agg.newBuy !== null && agg.newSell !== null) {
      agg.bestBuy = agg.newBuy;
      agg.bestSell = agg.newSell;
    }

    if (curr < agg.newBuy) {
      agg.newBuy = curr;
      agg.newSell = null;
    }

    return agg;
  }, markers);

  return markers.bestSell - markers.bestBuy;
}

function On2Solution(prices) {
  let maxProfit = null;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let profit = prices[j] - prices[i];
      if (maxProfit === null) {
        maxProfit = profit;
      } else if (profit > maxProfit) {
        maxProfit = profit;
      }
    }
  }
  return maxProfit;
}

console.log("===== Running: maxProfit =====");
let testcases = [
  {
    prices: [10],
    expected: "Error: Minimum of 2 prices required",
  },
  {
    prices: [10, 7, 5, 8, 11, 9],
    expected: 6,
  },
  {
    prices: [10, 7, 5, 2],
    expected: -2,
  },
  {
    prices: [10, 7, 5, 5, 2],
    expected: 0,
  },
  {
    prices: [10, 7, 5, 8, 11, 9, 1, 4, 3, 8, 6],
    expected: 7,
  },
  {
    prices: [10, 7, 5, 8, 11, 9, 1, 4, 3, 5, 2],
    expected: 6,
  },
];
testcases.forEach(function(testcase) {
  let result = maxProfit(testcase.prices);
  console.log(">>> prices:", testcase.prices);
  console.log("expected:", testcase.expected);
  console.log("actual:", result);
  if (result === testcase.expected) {
    console.log("SUCCESS!");
  } else {
    console.log("FAILURE!!!");
  }
});
