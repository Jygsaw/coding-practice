var linkedList = function () {
  var linkedListProto = {
    // linkedList = {
    //   head: null,
    //   tail: null,
    //   size: 0,
    // }
    pushHead: function (val) {
      // create new node
      var node = {
        val: val,
        next: null,
        prev: null,
      };
      node.next = this.head;

      // attach to list
      if (this.head !== null) {
        this.head.prev = node;
      }
      this.head = node;
      if (this.tail === null) {
        // new list edge case
        this.tail = node;
      }
      this.size++;
    },
    pushTail: function (val) {
      // create new node
      var node = {
        val: val,
        next: null,
        prev: null,
      };
      node.prev = this.tail;

      // attach to list
      if (this.tail !== null) {
        this.tail.next = node;
      }
      this.tail = node;
      if (this.head === null) {
        // new list edge case
        this.head = node;
      }
      this.size++;
    },
    popHead: function () {
      var node = this.head;
      if (node) {
        // update list
        this.head = node.next;
        this.size--;
      }

      if (this.head) {
        // unlink node
        this.head.prev = null;
      } else {
        // empty list
        this.tail = null;
      }

      return node.val;
    },
    popTail: function () {
      var node = this.tail;
      if (node) {
        // update list
        this.tail = node.prev;
        this.size--;
      }

      if (this.tail) {
        // unlink node
        this.tail.next = null;
      } else {
        // empty list
        this.head = null;
      }

      return node.val;
    },
    traverseIterative: function (node, callback) {
      while (node !== null) {
        callback(node);
        node = node.next;
      }
    },
    traverseRecursive: function (node, callback) {
      if (!node) {
        return;
      }
      callback(node);
      this.traverseRecursive(node.next, callback);
    },
    display: function() {
      var str = '(' + this.size + ') head => ';
      this.traverseIterative(this.head, function (node) {
        str += node.val + ' => ';
      });
      str += 'tail';
      console.log(str);
    },
  };

  return Object.assign(Object.create(linkedListProto), {
    head: null,
    tail: null,
    size: 0,
  });
};

module.exports = linkedList;
