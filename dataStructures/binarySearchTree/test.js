console.log("===== Testing: binarySearchTree =====");
var binarySearchTreeFactory = require('./binarySearchTree.js');

console.log(">>> initializing");
var tree = binarySearchTreeFactory();
tree.printTree();

[5,2,3,8,1,6,9,4,7].forEach(function (elem) {
  console.log(">>> insert:", elem);
  tree.insert(elem);
  tree.printTree();
});

[10,6].forEach(function (elem) {
  console.log(">>> find:", elem);
  var target = tree.find(elem);
  if (target) {
    target.printNode();
  } else {
    console.log("target not found");
  }
});

[2,8].forEach(function (elem) {
  console.log(">>> remove:", elem);
  var node = tree.find(elem);
  node.remove();
  tree.printTree();
});
