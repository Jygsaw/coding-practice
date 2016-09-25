/*
  Write a function to determine whether a binary tree is "superbalanced".
  A tree is "superbalanced" if the difference in depths of any two leaf nodes is no greater than one.
*/
"use strict";

let superBalanced = function (root) {
  if (!root) { return null; }

  let min = null;
  let max = null;

  let traverse = function (node, depth) {
    // short circuit when not superbalanced
    if (max - min > 1) { return; }

    depth = depth || 0;
    if (node.left === null && node.right === null) {
      // record depth of leaf node
      min = min !== null ? Math.min(min, depth) : depth;
      max = max !== null ? Math.max(max, depth) : depth;
    }

    // traverse children
    if (node.left !== null) {
      traverse(node.left, depth + 1);
    }
    if (node.right !== null) {
      traverse(node.right, depth + 1);
    }
  }

  traverse(root);

  return max - min <= 1 ? true : false;
}

let NodeFactory = function (value) {
  let NodeProto = {
    insertLeft: function (value) {
      let newNode = NodeFactory(value);
      this.left = newNode;
      return this.left;
    },
    insertRight: function (value) {
      let newNode = NodeFactory(value);
      this.right = newNode;
      return this.right;
    },
  };

  return Object.assign(Object.create(NodeProto), {
    value: value,
    left: null,
    right: null,
  });
}

console.log("===== Running: TempTracker =====");
let root;
let pointers;
let testcases = [
  {
    prep: () => {
      root = null;
      pointers = [];
    },
    expected: null,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[3] = pointers[1].insertLeft(3);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[3] = pointers[1].insertLeft(3);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[2] = pointers[0].insertRight(2);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[3] = pointers[1].insertLeft(3);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[8] = pointers[3].insertLeft(8);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[13] = pointers[6].insertLeft(13);
    },
    expected: false,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[13] = pointers[6].insertLeft(13);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[11] = pointers[5].insertLeft(11);
      pointers[13] = pointers[6].insertLeft(13);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[3] = pointers[1].insertLeft(3);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[9] = pointers[4].insertLeft(9);
      pointers[11] = pointers[5].insertLeft(11);
      pointers[12] = pointers[5].insertRight(12);
      pointers[13] = pointers[6].insertLeft(13);
      pointers[14] = pointers[6].insertRight(14);
      pointers[20] = pointers[9].insertRight(20);
      pointers[23] = pointers[11].insertLeft(23);
      pointers[24] = pointers[11].insertRight(24);
      pointers[25] = pointers[12].insertLeft(25);
      pointers[26] = pointers[12].insertRight(26);
      pointers[27] = pointers[13].insertLeft(27);
      pointers[28] = pointers[13].insertRight(28);
      pointers[29] = pointers[14].insertLeft(29);
      pointers[30] = pointers[14].insertRight(30);
    },
    expected: false,
  },
  {
    prep: () => {
      root = NodeFactory(0);
      pointers = [];
      pointers[0] = root;
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      pointers[11] = pointers[5].insertLeft(11);
      pointers[13] = pointers[6].insertLeft(13);
      pointers[27] = pointers[13].insertLeft(27);
    },
    expected: false,
  },
  {
    prep: () => {
      // TODO create function to build binary tree
      // brute force insertion
      root = NodeFactory(0);
      pointers = [];
      // depth = 0
      pointers[0] = root;
      // depth = 1
      pointers[1] = pointers[0].insertLeft(1);
      pointers[2] = pointers[0].insertRight(2);
      // depth = 2
      pointers[3] = pointers[1].insertLeft(3);
      pointers[4] = pointers[1].insertRight(4);
      pointers[5] = pointers[2].insertLeft(5);
      pointers[6] = pointers[2].insertRight(6);
      // depth = 3
      pointers[7] = pointers[3].insertLeft(7);
      pointers[8] = pointers[3].insertRight(8);
      pointers[9] = pointers[4].insertLeft(9);
      pointers[10] = pointers[4].insertRight(10);
      pointers[11] = pointers[5].insertLeft(11);
      pointers[12] = pointers[5].insertRight(12);
      pointers[13] = pointers[6].insertLeft(13);
      pointers[14] = pointers[6].insertRight(14);
      // depth = 4
      pointers[15] = pointers[7].insertLeft(15);
      pointers[16] = pointers[7].insertRight(16);
      pointers[17] = pointers[8].insertLeft(17);
      pointers[18] = pointers[8].insertRight(18);
      pointers[19] = pointers[9].insertLeft(19);
      pointers[20] = pointers[9].insertRight(20);
      pointers[21] = pointers[10].insertLeft(21);
      pointers[22] = pointers[10].insertRight(22);
      pointers[23] = pointers[11].insertLeft(23);
      pointers[24] = pointers[11].insertRight(24);
      pointers[25] = pointers[12].insertLeft(25);
      pointers[26] = pointers[12].insertRight(26);
      pointers[27] = pointers[13].insertLeft(27);
      pointers[28] = pointers[13].insertRight(28);
      pointers[29] = pointers[14].insertLeft(29);
      pointers[30] = pointers[14].insertRight(30);
    },
    expected: true,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  testcase.prep();
  let result = superBalanced(root);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("root:", root);
  }
});
