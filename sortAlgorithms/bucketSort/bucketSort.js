var bucketSort = function (input) {
  // initializing buckets
  console.log("> initializing buckets");
  var numBuckets = 10;
  var maxRange = 100;
  console.log("buckets:", numBuckets);
  console.log("maxRange:", maxRange);
  var buckets = [];
  for (var i = 0; i < numBuckets; i++) {
    buckets[i] = [];
  }

  // distributing numbers to buckets
  console.log("> distributing numbers");
  input.forEach(function (elem) {
    var bIndex = Math.floor(elem * (numBuckets / maxRange));
    console.log("checking:", elem);
    console.log("assigning to bucket:", bIndex);
    buckets[bIndex].push(elem);
  });

  // sorting bucket contents
  console.log("> sorting bucket contents");
  for (var i = 0; i < numBuckets; i++) {
    console.log("bucket:", i);
    console.log("contents:", buckets[i]);
    buckets[i].sort(function (a, b) {
      return a - b;
    });
    console.log("sorted:", buckets[i]);
  }

  // concatenate buckets and return
  return buckets.reduce(function (prev, curr) {
    return prev.concat(curr);
  }, []);
};

module.exports = bucketSort;
