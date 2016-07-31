var heap = function () {
  var heapProto = {
    peek: function () {
      return this.data[0];
    },
    push: function (val) {
      if (val === undefined) {
        return;
      }

      // insert new val as last element
      this.data.push(val);

      // push new node up heap to fix heap properties
      this.upHeap(this.data.length - 1);
    },
    pop: function () {
      // last element edge case
      if (this.data.length <= 1) {
        return this.data.pop();
      }

      // save root node
      var retVal = this.data[0];

      // replace root node with last element
      this.data[0] = this.data.pop();

      // push root node down heap to fix heap properties
      this.downHeap(0);

      return retVal;
    },
    replace: '',
    heapify: function (numArray) {
      // copy data
      this.data = numArray.slice();

      // downHeap all elements
      for (var i = this.data.length - 1; i >= 0; i--) {
        this.downHeap(i);
      }
    },
    merge: '',
    meld: '',
    size: function () {
      return this.data.length;
    },
    isEmpty: function () {
      return this.data.length === 0;
    },
    delete: '',
    upHeap: function (node) {
      console.log("> checking upHeap");

      // check if node and parent satisfy min heap properties
      var parent = Math.floor((node - 1) / 2);
      if (this.data[node] < this.data[parent]) {
        console.log("inversion detected:", this.data[node], " < ", this.data[parent]);
        // swap values and verify heap properties again
        this.swap(node, parent);
        this.upHeap(parent);
      }
    },
    downHeap: function (node) {
      console.log("> checking downHeap");

      // check if node and lesser child satisfy min heap properties
      var lesserChild = this.findLesserChild(node);
      if (lesserChild &&
          this.data[node] > this.data[lesserChild]) {
        console.log("inversion detected:", this.data[node], " > ", this.data[lesserChild]);
        // swap values and verify heap properties again
        this.swap(node, lesserChild);
        this.downHeap(lesserChild);
      }
    },
    findLesserChild: function (node) {
      var leftChild = node * 2;
      var rightChild = (node * 2) + 1;

      // return left if rightChild undefined
      if (rightChild > this.data.length) {
        return leftChild;
      } else {
        // return child node with lesser value
        return this.data[leftChild] < this.data[rightChild] ? leftChild : rightChild;
      }
    },
    swap: function (a, b) {
      var tmp = this.data[a];
      this.data[a] = this.data[b];
      this.data[b] = tmp;
    },
    display: function () {
      console.log("< heap >")
      if (this.isEmpty()) {
        console.log("empty heap");
      } else {
        console.log(this.data);
      }
    },
  };

  return Object.assign(Object.create(heapProto), {
    data: [],
  });
};

module.exports = heap;
