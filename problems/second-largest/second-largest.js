/*
  Write a function to find the second largest element in a binary search tree.
*/
"use strict";

let secondLargest = function (node) {
  if (!node) { return null; }

  // single elem tree
  if (node.left === null && node.right === null) {
    return null;
  }

  let maxNode = node.getMaxNode();
  if (maxNode.left === null && maxNode.right === null) {
    // parent of max
    return maxNode.parent.value;
  } else {
    // max of lesser subtree
    return maxNode.left.getMaxNode().value;
  }
};

let NodeFactory = function (value) {
  let NodeProto = {
    insertLeft: function (value) {
      let newNode = NodeFactory(value);
      newNode.parent = this;
      this.left = newNode;
      return this.left;
    },
    insertRight: function (value) {
      let newNode = NodeFactory(value);
      newNode.parent = this;
      this.right = newNode;
      return this.right;
    },
    getMaxNode: function () {
      return this.right === null ? this : this.right.getMaxNode();
    },
  };

  return Object.assign(Object.create(NodeProto), {
    value: value,
    parent: null,
    left: null,
    right: null,
  });
}

console.log("===== Running: secondLargest =====");
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
    expected: null,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(4);
    },
    expected: 4,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(4);
      pointers[2] = pointers[0].insertRight(12);
    },
    expected: 8,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[3] = pointers[1].insertLeft(1);
    },
    expected: 3,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[2] = pointers[0].insertRight(10);
      pointers[3] = pointers[1].insertLeft(1);
    },
    expected: 8,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[2] = pointers[0].insertRight(10);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[5] = pointers[2].insertLeft(9);
    },
    expected: 9,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(6);
    },
    expected: 6,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[2] = pointers[0].insertRight(10);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(6);
      pointers[6] = pointers[2].insertRight(14);
      pointers[9] = pointers[4].insertLeft(4);
      pointers[10] = pointers[4].insertRight(7);
    },
    expected: 10,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(6);
      pointers[9] = pointers[4].insertLeft(4);
      pointers[10] = pointers[4].insertRight(7);
    },
    expected: 7,
  },
  {
    prep: () => {
      pointers = [];
      pointers[0] = NodeFactory(8);
      pointers[1] = pointers[0].insertLeft(3);
      pointers[3] = pointers[1].insertLeft(1);
      pointers[4] = pointers[1].insertRight(6);
      pointers[9] = pointers[4].insertLeft(4);
    },
    expected: 6,
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
    expected: 13,
  },
];

testcases.forEach(function(testcase) {
  console.log("========== TESTCASE ==========");
  testcase.prep();
  let result = secondLargest(pointers[0]);
  if (testcase.expected === result) {
    console.log(">>> SUCCESS! <<<");
  } else {
    console.log(">>> FAILURE!!! <<<");
    console.log("tree:", pointers[0]);
  }
});
