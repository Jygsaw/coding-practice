var binarySearchTree = function (val) {
  var binarySearchTreeProto = {
    // tree = {
    //   val: null,
    //   parent: null,
    //   children: [],
    // }
    insert: function (val) {
      if (val === undefined) {
        return;
      }

      // empty tree edge case
      if (this.val === null) {
        this.val = val;
        return this;;
      }

      var branchIndex = val < this.val ? 0 : 1;
      if (this.children[branchIndex] === undefined) {
        var node = binarySearchTree(val);
        node.parent = this;
        this.children[branchIndex] = node;
      } else {
        this.children[branchIndex].insert(val);
      }

      return this;
    },
    remove: function () {
      var leftChild = this.children[0];
      var rightChild = this.children[1];

      if (!leftChild && !rightChild) {
        if (this.parent) {
          // delete reference from parent when no children
          var parentBranch = this.val < this.parent.val ? 0 : 1;
          this.parent.children[parentBranch] = null;
        } else {
          // empty tree edge case
          this.val = null;
        }
      } else if (leftChild && rightChild) {
        // find replacement node
        var node = this.children[0];
        while (node.children[1]) {
          node = node.children[1];
        }

        // remove replacement node from tree
        node.remove();

        // replace current val with replacement val
        this.val = node.val;
      } else {
        // use only child as replacement node
        var childBranch = rightChild ? 0 : 1;
        this.val = this.children[childBranch].val;
        this.children[childBranch] = null;
      }
    },
    find: function (val) {
      if (this.val === null) {
        return null;
      } else if (this.val === val) {
        return this;
      } else {
        var branchIndex = val < this.val ? 0 : 1;
        if (this.children[branchIndex]) {
          return this.children[branchIndex].find(val);
        } else {
          return null;
        }
      }
    },
    traverseInOrder: function (callback) {
      if (this.children[0]) {
        this.children[0].traverseInOrder(callback);
      }
      callback(this);
      if (this.children[1]) {
        this.children[1].traverseInOrder(callback);
      }
    },
    traversePreOrder: function (callback) {
      callback(this);
      if (this.children[0]) {
        this.children[0].traversePreOrder(callback);
      }
      if (this.children[1]) {
        this.children[1].traversePreOrder(callback);
      }
    },
    traversePostOrder: function (callback) {
      if (this.children[0]) {
        this.children[0].traversePostOrder(callback);
      }
      if (this.children[1]) {
        this.children[1].traversePostOrder(callback);
      }
      callback(this);
    },
    printNode: function (node) {
      var node = node ? node : this;
      console.log("=== node ===");
      console.log("val:", node.val);
      console.log("parent:", node.parent ? node.parent.val : null);
    },
    printTree: function () {
      this.traversePostOrder(this.printNode);
    },
  };

  return Object.assign(Object.create(binarySearchTreeProto), {
    val: val !== undefined ? val : null,
    parent: null,
    children: [],
  });
}

module.exports = binarySearchTree;
