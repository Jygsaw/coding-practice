var merge = function (arrA, arrB) {
  console.log("> merging");
  console.log("left:", arrA);
  console.log("right:", arrB);
  var merged = [];
  var indexA = 0;
  var indexB = 0;

  // handle empty arrays
  if (!arrA) {
    return arrB;
  } else if (!arrB) {
    return arrA;
  }

  while (indexA < arrA.length || indexB < arrB.length) {
    if (indexA === arrA.length) {
      merged.push(arrB[indexB]);
      indexB++;
    } else if (indexB === arrB.length) {
      merged.push(arrA[indexA]);
      indexA++;
    } else {
      if (arrA[indexA] < arrB[indexB]) {
        merged.push(arrA[indexA]);
        indexA++;
      } else {
        merged.push(arrB[indexB]);
        indexB++;
      }
    }
  }
  console.log("merged:", merged);

  return merged;
}

var mergeSort = function (input) {
  var copy = input.slice();

  if (copy.length === 1) {
    console.log("base case:", copy);
    return copy;
  }

  var left = copy.slice(0, Math.floor(copy.length / 2));
  var right = copy.slice(Math.floor(copy.length / 2));
  console.log("> splitting input:", copy);
  console.log("left:", left);
  console.log("right:", right);

  return merge(mergeSort(left), mergeSort(right));
}

module.exports = mergeSort;
