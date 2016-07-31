var bubbleSort = function (input) {
  // copy input array because arrays are mutable
  var copy = input.slice();

  var maxIndex = copy.length - 1;
  for (var k = 0; k < maxIndex; k++) {
    for (var i = 0; i < maxIndex - k; i++) {
      console.log("> comparing:", copy[i], " <=> ", copy[i + 1]);

      // check if current num is greater than next num in array
      if (copy[i] > copy[i + 1]) {
        console.log("> swapping")
        var tmp = copy[i];
        copy[i] = copy[i + 1];
        copy [i + 1] = tmp;
      } else {
        console.log("> skipping");
      }
    }

    console.log("pass", k + 1 + ":", copy);
  }

  return copy;
}

module.exports = bubbleSort;
