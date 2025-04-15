'use strict';

/**
 * Implement method Sort using merge sort
 */
function applyCustomSort() {
  [].__proto__.sort2 = function (compareFunction) {
    const defaultCompare = (a, b) => {
      const aStr = String(a);
      const bStr = String(b);

      if (aStr < bStr) return -1;
      if (aStr > bStr) return 1;
      return 0;
    };

    const comparator = compareFunction || defaultCompare;
    const sorted = mergeSort(this.slice(), comparator);

    // Update original array in place
    for (let i = 0; i < sorted.length; i++) {
      this[i] = sorted[i];
    }

    return this;
  };

  [].__proto__.sort = [].__proto__.sort2;

  // Merge Sort Implementation
  function mergeSort(arr, comparator) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), comparator);
    const right = mergeSort(arr.slice(mid), comparator);

    return merge(left, right, comparator);
  }

  function merge(left, right, comparator) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (comparator(left[i], right[j]) <= 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

module.exports = applyCustomSort;
