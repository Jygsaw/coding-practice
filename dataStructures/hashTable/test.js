console.log("===== Testing: hashTable =====");
var hashTableFactory = require('./hashTable.js');

console.log(">>> initializing");
var hash = hashTableFactory();
hash.display();

[
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
].forEach(function (elem) {
  var key = elem[0];
  var val = elem[1];
  console.log(">>> inserting:", key, " => ", val);
  hash.insert(key, val);
  hash.display();
});

[
  ['one', 'eins'],
  // ['two', 'zwei'],
  ['three', 'drei'],
  // ['four', 'vier'],
  ['five', 'funf'],
  // ['six', 'sechs'],
  ['seven', 'sieben'],
  // ['eight', 'acht'],
  ['nine', 'neun'],
].forEach(function (elem) {
  var key = elem[0];
  var val = elem[1];
  console.log(">>> inserting:", key, " => ", val);
  hash.insert(key, val);
  hash.display();
});

[
  'bogus',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
].forEach(function (key) {
  console.log(">>> finding:", key);
  var val = hash.find(key);
  console.log("val:", val);
});

[
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
].forEach(function (key) {
  console.log(">>> removing:", key);
  hash.remove(key);
  hash.display();
});
