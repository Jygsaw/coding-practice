var heapFactory = require('../../dataStructures/minHeap/minHeap.js');

var heapSort = function (input) {
  // insert data into heap
  console.log(">>> heapifying input");
  var heap = heapFactory();
  heap.heapify(input);

  // extract data from heap
  console.log(">>> extracting result")
  var output = [];
  while (heap.size() > 0) {
    var popVal = heap.pop();
    console.log("pop val:", popVal);
    output.push(popVal);
  }

  return output;
}

module.exports = heapSort;
