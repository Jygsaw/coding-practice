/*
  Write a function to verify a binary tree is a valid binary search tree.
*/
"use strict";

let bstChecker = function (node, min, max) {
  if (!node) { return null; }

  min = min || -Infinity;
  max = max || Infinity;

  if (node.value <= min ||
      node.value > max ||
      (node.left !== null && !bstChecker(node.left, min, node.value)) ||
      (node.right !== null && !bstChecker(node.right, node.value, max))) {
    return false;
  }

  return true;
};

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

console.log("===== Running: bstChecker =====");
let pointers;
let testcases = [
  {
    prep: () => {
      pointers = [];
    },
    expected: null,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
    },
    expected: true,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(4);
    },
    expected: true,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(4);
      pointers[2] = pointers[0].insertRight(12);
    },
    expected: true,
  },
  {
    prep: () => {
      root = NodeFactory(8);
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(10);
      pointers[2] = pointers[0].insertRight(12);
    },
    expected: false,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[2] = pointers[0].insertRight(10);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(9);
      pointers[5] = null;
      pointers[6] = pointers[2].insertRight(14);
    },
    expected: false,
  },
  {
    prep: () => {
      // TODO create function to build binary search tree
      // brute force insertion
      pointers = [];
      // depth = 0
      pointers[0] = NodeFactory(8);
      // depth = 1
      pointers[1] = pointers[0].insertLeft(3);
      pointers[2] = pointers[0].insertRight(10);
      // depth = 2
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(6);
      pointers[5] = null;
      pointers[6] = pointers[2].insertRight(14);
      // depth = 3
      pointers[7] = null;
      pointers[8] = null;
      pointers[9] = pointers[4].insertLeft(4);
      pointers[10] = pointers[4].insertRight(7);
      pointers[11] = null;
      pointers[12] = null;
      pointers[13] = pointers[6].insertLeft(13);
      pointers[14] = null;
    },
    expected: true,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  testcase.prep();
  let result = bstChecker(pointers[0]);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("tree:", pointers[0]);
  }
});
