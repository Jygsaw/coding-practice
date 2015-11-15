var insertionSort = function (input) {
  var copy = input.slice();
  for (var k = 1; k < copy.length; k++) {
    console.log("> checking:", copy[k]);

    for (var i = k - 1; i >= 0; i--) {
      console.log("> comparing:", copy[i]);

      if (copy[i] > copy[i + 1]) {
        console.log("> swapping");
        var tmp = copy[i];
        copy[i] = copy[i + 1];
        copy[i + 1] = tmp;
      } else {
        console.log("> skipping");
        break;
      }
    }

    console.log("pass", k + ":", copy);
  }

  return copy;
}

module.exports = insertionSort;
