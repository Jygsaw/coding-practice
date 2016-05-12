/*
  Description
  Grid list is a data structure that is built from layers of nodes.  All layers start with a "Home" node and end with a Null value instead of the final node.  Each node has a "Value", a "Next" pointer to the next node in the layer and a "Below" pointer to a node of the same value in the next layer.  On each layer, values are sorted in an ascending order.

  Example
  H ------> 8 -------------------------------------> 81 -------> NULL
  H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL
  H ------> 8 -> 25 -> 28 -------> 52 -------------> 81 -------> NULL
  H -> 5 -> 8 -> 25 -> 28 -> 33 -> 52 -> 55 -> 70 -> 81 -> 83 -> NULL

  Data Structure
  Each node i nthe data structure can be described as:
  class Node {
    int value;
    Node next;
    Node below;
  }

  Task
  Write a function layerSearch that will get a starting node Root and a search value Value and will return the minimal number of hops that are needed in order to either reach the node with that value or to see that it does not exist in the data structure.

  Test Input
  Number of layers, followed by a list of new nodes for each layer and finally the number that should be found.  All of the values are integers, larger than 0.  Values for each layer are guaranteed to be in ascending order.
  For example the following input:
  4
  8
  25 52
  25 81
  5 33 55 70 83
  55
  will result with the data structure descried above and the value to be found is 55

  Output
  For the example above, the output is 7.
*/
function layerSearch(root, value) {
// console.log("executing layersearch");
  // define recursive function
  var nodeSearch = function (node, value) {
// console.log("executing nodesearch");
    if (node.value === value) {
// console.log("value found");
      return 1;
    }

    if (node.value === 'HEAD' || node.value < value) {
      if (node.next !== null) {
        var nextHops = nodeSearch(node.next, value);
        if (nextHops) {
          return nextHops + 1;
        }
      }

      if (node.below !== null) {
        var belowHops = nodeSearch(node.below, value);
        if (belowHops) {
          return belowHops + 1;
        }
      }
    }

    return null;
  };

  var recurseCount = nodeSearch(root, value);
  return recurseCount ? recurseCount - 1 : null;
}

// testcases
console.log("===== Running Tests =====");
var layers = {};
var runTestcase = function (testcase) {
  // console.log(">>> executing testcase <<<");
  // console.log("> starting at:", JSON.stringify(testcase.start));
  // console.log("> searching for:", JSON.stringify(testcase.value));
  // console.log("> expected:", JSON.stringify(testcase.out));

  var result = layerSearch(layers[testcase.start], testcase.value);
  // console.log("> actual:", JSON.stringify(result));
  if (testcase.out === result) {
    console.log("> PASSED");
  } else {
    console.log("> FAILED!!!");
  }
};

/*
  H -----------------------------------------------------------> NULL
*/
layers['HEAD-1'] = {
  value: 'HEAD',
  next: null,
  below: null,
};
console.log("H -----------------------------------------------------------> NULL");
[
  {
    start: 'HEAD-1',
    value: 8,
    out: null,
  },
].forEach(runTestcase);

/*
  H ------> 8 -------------------------------------> 81 -------> NULL
*/
layers['81-1'] = {
  value: 81,
  next: null,
  below: null,
};
layers['8-1'] = {
  value: 8,
  next: layers['81-1'],
  below: null,
};
layers['HEAD-1'].next = layers['8-1'];
console.log("H ------> 8 -------------------------------------> 81 -------> NULL");
[
  {
    start: 'HEAD-1',
    value: 8,
    out: 1,
  },
  {
    start: '8-1',
    value: 8,
    out: 0,
  },
  {
    start: 'HEAD-1',
    value: 47,
    out: null,
  },
].forEach(runTestcase);

/*
  H ------> 8 -------------------------------------> 81 -------> NULL
  H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL
*/
layers['81-2'] = {
  value: 81,
  next: null,
  below: null,
};
layers['52-2'] = {
  value: 52,
  next: layers['81-2'],
  below: null,
};
layers['28-2'] = {
  value: 28,
  next: layers['52-2'],
  below: null,
};
layers['8-2'] = {
  value: 8,
  next: layers['28-2'],
  below: null,
};
layers['HEAD-2'] = {
  value: 'HEAD',
  next: layers['8-2'],
  below: null,
};
layers['HEAD-1'].below = layers['HEAD-2'];
layers['8-1'].below = layers['8-2'];
layers['81-1'].below = layers['81-2'];
console.log("H ------> 8 -------------------------------------> 81 -------> NULL");
console.log("H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL");
[
  {
    start: 'HEAD-1',
    value: 8,
    out: 1,
  },
  {
    start: 'HEAD-1',
    value: 28,
    out: 3,
  },
  {
    start: 'HEAD-1',
    value: 52,
    out: 4,
  },
  {
    start: 'HEAD-1',
    value: 80,
    out: null,
  },
  {
    start: 'HEAD-2',
    value: 8,
    out: 1,
  },
  {
    start: '8-2',
    value: 52,
    out: 2,
  },
  {
    start: 'HEAD-2',
    value: 80,
    out: null,
  },
].forEach(runTestcase);

/*
  H ------> 8 -------------------------------------> 81 -------> NULL
  H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL
  H ------> 8 -> 25 -> 28 -------> 52 -------------> 81 -------> NULL
*/
layers['81-3'] = {
  value: 81,
  next: null,
  below: null,
};
layers['52-3'] = {
  value: 52,
  next: layers['81-3'],
  below: null,
};
layers['28-3'] = {
  value: 28,
  next: layers['52-3'],
  below: null,
};
layers['25-3'] = {
  value: 25,
  next: layers['28-3'],
  below: null,
};
layers['8-3'] = {
  value: 8,
  next: layers['25-3'],
  below: null,
};
layers['HEAD-3'] = {
  value: 'HEAD',
  next: layers['8-3'],
  below: null,
};
layers['HEAD-2'].below = layers['HEAD-3'];
layers['8-2'].below = layers['8-3'];
layers['28-2'].below = layers['28-3'];
layers['52-2'].below = layers['52-3'];
layers['81-2'].below = layers['81-3'];
console.log("H ------> 8 -------------------------------------> 81 -------> NULL");
console.log("H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL");
console.log("H ------> 8 -> 25 -> 28 -------> 52 -------------> 81 -------> NULL");
[
  {
    start: 'HEAD-1',
    value: 81,
    out: 6,
  },
  {
    start: 'HEAD-2',
    value: 81,
    out: 5,
  },
  {
    start: 'HEAD-3',
    value: 81,
    out: 5,
  },
  {
    start: 'HEAD-1',
    value: 25,
    out: 4,
  },
  {
    start: '28-2',
    value: 8,
    out: null,
  },

  {
    start: 'HEAD-1',
    value: 80,
    out: null,
  },
].forEach(runTestcase);

/*
  H ------> 8 -------------------------------------> 81 -------> NULL
  H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL
  H ------> 8 -> 25 -> 28 -------> 52 -------------> 81 -------> NULL
  H -> 5 -> 8 -> 25 -> 28 -> 33 -> 52 -> 55 -> 70 -> 81 -> 83 -> NULL
*/
layers['83-4'] = {
  value: 83,
  next: null,
  below: null,
};
layers['81-4'] = {
  value: 81,
  next: layers['83-4'],
  below: null,
};
layers['70-4'] = {
  value: 70,
  next: layers['81-4'],
  below: null,
};
layers['55-4'] = {
  value: 55,
  next: layers['70-4'],
  below: null,
};
layers['52-4'] = {
  value: 52,
  next: layers['55-4'],
  below: null,
};
layers['33-4'] = {
  value: 33,
  next: layers['52-4'],
  below: null,
};
layers['28-4'] = {
  value: 28,
  next: layers['33-4'],
  below: null,
};
layers['25-4'] = {
  value: 25,
  next: layers['28-4'],
  below: null,
};
layers['8-4'] = {
  value: 8,
  next: layers['25-4'],
  below: null,
};
layers['5-4'] = {
  value: 5,
  next: layers['8-4'],
  below: null,
};
layers['HEAD-4'] = {
  value: 'HEAD',
  next: layers['5-4'],
  below: null,
};
layers['HEAD-3'].below = layers['HEAD-4'];
layers['8-3'].below = layers['8-4'];
layers['25-3'].below = layers['25-4'];
layers['28-3'].below = layers['28-4'];
layers['52-3'].below = layers['52-4'];
layers['81-3'].below = layers['81-4'];
console.log("H ------> 8 -------------------------------------> 81 -------> NULL");
console.log("H ------> 8 -------> 28 -------> 52 -------------> 81 -------> NULL");
console.log("H ------> 8 -> 25 -> 28 -------> 52 -------------> 81 -------> NULL");
console.log("H -> 5 -> 8 -> 25 -> 28 -> 33 -> 52 -> 55 -> 70 -> 81 -> 83 -> NULL");
[
  {
    start: 'HEAD-1',
    value: 90,
    out: null,
  },
  {
    start: 'HEAD-1',
    value: 2,
    out: null,
  },
  {
    start: 'HEAD-1',
    value: 5,
    out: 4,
  },
  {
    start: 'HEAD-1',
    value: 55,
    out: 7,
  },
  {
    start: 'HEAD-2',
    value: 33,
    out: 5,
  },
  {
    start: 'HEAD-3',
    value: 33,
    out: 5,
  },
  {
    start: 'HEAD-2',
    value: 70,
    out: 7,
  },
  {
    start: 'HEAD-4',
    value: 70,
    out: 8,
  },
  {
    start: 'HEAD-1',
    value: 81,
    out: 2,
  },
  {
    start: 'HEAD-1',
    value: 83,
    out: 6,
  },
  {
    start: 'HEAD-2',
    value: 83,
    out: 7,
  },
  {
    start: 'HEAD-3',
    value: 83,
    out: 7,
  },
  {
    start: 'HEAD-4',
    value: 83,
    out: 10,
  },
].forEach(runTestcase);
