console.log("===== Testing: linkedList =====");
var linkedListFactory = require('./linkedList.js');

console.log(">>> initializing");
var list = linkedListFactory();
list.display();

var mid = 20;
for (var i = 0; i < 5; i++) {
  var next = mid + i * 2
  console.log(">>> insert tail:", next);
  list.pushTail(next);
  list.display();

  var prev = mid - i * 2;
  console.log(">>> insert head:", prev);
  list.pushHead(prev);
  list.display();
}

for (var i = 0; i < 5; i++) {
  console.log(">>> remove head");
  console.log("head val:", list.popHead());
  list.display();

  console.log(">>> remove tail");
  console.log("tail val:", list.popTail());
  list.display();
}
