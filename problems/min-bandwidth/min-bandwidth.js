/**
  * Write a function to find a linear graph arrangement that solves for the minimum bandwidth of
  * a given graph
  * see: https://en.wikipedia.org/wiki/Graph_bandwidth
  */

// solution: 'bac', 'cab'
// var adjList = {
//   a: ['b','c'],
//   b: ['a'],
//   c: ['a'],
// };

// solution: 'abc', 'acb', 'bac', 'bca', 'cab', 'cba'
// var adjList = {
//   a: [],
//   b: [],
//   c: [],
// };

// solution: 'abc', 'bac', 'cab', 'cba'
// var adjList = {
//   a: ['b'],
//   b: ['a'],
//   c: [],
// };

// solution: n! permutations
// var adjList = {
//   a: [],
//   b: [],
//   c: [],
//   d: [],
// };

// BROKEN
// solution: 'cbad', 'dabc'
var adjList = {
  a: ['b','d'],
  b: ['a','c'],
  c: ['b'],
  d: ['a'],
};

// solution: 'acbd', 'acdb', 'bdac', 'bdca', 'cabd', 'cadb', 'dbac', 'dbca'
// var adjList = {
//   a: ['c'],
//   b: ['d'],
//   c: ['a'],
//   d: ['b'],
// };


function isConnected(left, right) {
  if (left === undefined ||
      right === undefined) {
    return false;
  }

  var edges = adjList[left];
  for (var i = 0; i < edges.length; i++) {
    if (edges[i] === right) {
      return true;
    }
  }

  return false;
}

function genMinBandGraph(vertices) {
  var altStacks = genAltStacks(vertices);

  // reorder alternating stacks
  console.log("=== reorder alternating stacks ===");
  var bandGraphs = [];
  altStacks.forEach(function (elem) {
    var head = [];
    var tail = [];
    for (var i = 0; i < elem.length; i++) {
      if (i % 2) {
        tail.push(elem[i]);
      } else {
        head.push(elem[i]);
      }
    }
    bandGraphs.push(head.concat(tail.reverse()).join(''));
  });

  // filter for min internal lengths

  return bandGraphs;
}

function genAltStacks(pool) {
  console.log("=== generating alternating stack ===");
  var results = [];
  var queue = [{
    selected: [],
    pool: pool,
  }];
  console.log("starting queue:", queue);

  // initializing tier variables
  var tierConnected = true;
  var tierBest = [];
  while (queue.length > 0) {
    var state = queue.shift();
    console.log(">>> procesing:", state, "<<<");

    // base case
    if (state.pool.length === 0) {
      console.log("base case triggered");
      results.push(state.selected);
      continue;
    }

    // evaluating choices
    var connected = true;
    var bestPicks = [];
    for (var i = 0; i < state.pool.length; i++) {
      // copy state
      var selected = state.selected.slice();
      var remainder = state.pool.slice();

      // pick a node
      var pick = state.pool[i];
      var hasEdge = isConnected(selected[selected.length - 1], pick);
      selected.push(pick);
      remainder.splice(i, 1);

      console.log("> picking:", pick);
      console.log("connected:", hasEdge);

      // compare pick across pool
      var newState = {
        selected: selected,
        pool: remainder,
      };
      if (remainder.length === 0) {
        // connection on last element is moot
        bestPicks.push(newState);
      } else if (hasEdge && connected) {
        bestPicks.push(newState);
      } else if (!hasEdge && !connected) {
        bestPicks.push(newState);
      } else if (!hasEdge && connected) {
        connected = false;
        bestPicks = [newState];
      }
    }

    console.log("> reviewing comparison picks");
    console.log("connected:", connected);
    console.log("bestPicks:", bestPicks);

    // add best picks to tier picks and reset pool comparison
    if (connected && tierConnected) {
      console.log("pool picks added to CONNECTED tier picks");
      tierBest = tierBest.concat(bestPicks);
    } else if (!connected && !tierConnected) {
      console.log("pool picks added to DISCONNECTED tier picks");
      tierBest = tierBest.concat(bestPicks);
    } else if (!connected && tierConnected) {
      console.log("pool picks REPLACED connected tier picks");
      tierConnected = false;
      tierBest = bestPicks;
    }
    connected = true;
    bestPicks = [];

    // add tierBest to empty queue and reset tier comparison
    if (queue.length === 0) {
      console.log("tier picks QUEUED for next tier processing");
      console.log("tierBest:", tierBest);
      queue = tierBest;
      tierConnected = true;
      tierBest = [];
    }
  }

  return results;
}

console.log("===== Running: minBandwidth =====");
console.log("min linear graph:", genMinBandGraph(Object.keys(adjList)));
