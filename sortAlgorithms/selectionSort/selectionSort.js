var selectionSort = function (input) {
  var copy = input.slice();
  for (var k = 0; k < copy.length - 1; k++) {
    var minIndex = k;
    console.log("> checking:", copy[minIndex]);

    for (var i = k + 1; i < copy.length; i++) {
      if (copy[i] < copy[minIndex]) {
        console.log("new min found:", copy[i]);
        minIndex = i;
      }
    }

    // move next min into final position
    console.log("> swapping:", copy[k], '<=>', copy[minIndex]);
    var tmp = copy[k];
    copy[k] = copy[minIndex];
    copy[minIndex] = tmp;

    console.log("pass", k + 1 + ":", copy);
  }

  return copy;
}

module.exports = selectionSort;
