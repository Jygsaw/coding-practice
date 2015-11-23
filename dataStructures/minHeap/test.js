console.log("===== Testing: minHeap =====");
var minHeapFactory = require('./minHeap.js');

console.log(">>> initializing");
var heap = minHeapFactory();
heap.display();

[9,5,2,4,7,2,1,6,3,1].forEach(function (elem) {
  console.log(">>> pushing:", elem);
  heap.push(elem);
  heap.display();
});

for (var i = 0; i < 10; i++) {
  console.log(">>> popping heap");
  console.log("pop val:", heap.pop());
  heap.display();
}

heap.heapify([9,5,2,4,7,2,1,6,3,1]);
heap.display();
