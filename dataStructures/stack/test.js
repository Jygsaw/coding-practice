console.log("===== Testing: stack =====");
var stackFactory = require('./stack.js');

console.log(">>> initializing");
var stack = stackFactory();
stack.display();

[1,2,3,4,5,6,7,8,9].forEach(function (elem) {
  console.log(">>> pushing:", elem);
  stack.push(elem);
  stack.display();
});

for (var i = 0; i < 9; i++) {
  console.log(">>> popping stack");
  console.log("popped val:", stack.pop());
  stack.display();
}
