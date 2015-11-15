var quickSort = function (input) {
  var copy = input.slice();
  // console.log("start pass:", copy);

  if (copy.length <= 1) {
    console.log("base case:", copy);
    return copy;
  }

  // set pivot val
  var pivot = copy[copy.length - 1];
  console.log("> selecting pivot val:", pivot);

  // find pivot point and swap inversions
  var indexLeft = 0;
  var indexRight = copy.length - 2;
  while (indexLeft <= indexRight) {
    console.log("> searching for pivot point");
    console.log("left index:", indexLeft, " = ", copy[indexLeft]);
    console.log("right index:", indexRight, " = ", copy[indexRight]);

    // swap if inversion detected
    if (copy[indexLeft] > pivot &&
        copy[indexRight] <= pivot) {
      console.log("> swapping inversion");
      console.log("left val:", copy[indexLeft]);
      console.log("right val:", copy[indexRight]);
      var tmp = copy[indexLeft];
      copy[indexLeft] = copy[indexRight];
      copy[indexRight] = tmp;
    }

    // move indices if necessary
    if (copy[indexLeft] <= pivot) {
      console.log("> incrementing left");
      indexLeft++;
    }

    if (copy[indexRight] > pivot) {
      console.log("> decrementing right");
      indexRight--;
    }
  }

  // split list and recurse
  console.log("> splitting list");
  console.log("pivot index:", indexLeft);
  var left = copy.slice(0, indexLeft);
  var right = copy.slice(indexLeft, copy.length - 1);
  console.log("left:", left);
  console.log("right:", right);
  var result = [].concat(quickSort(left), pivot, quickSort(right));
  console.log("merged:", result);

  return result;
}

module.exports = quickSort;
