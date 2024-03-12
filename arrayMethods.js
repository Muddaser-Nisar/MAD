// Method to find the largest element in the array
Array.prototype.findLargest = function () {
  if (this.length === 0) {
    return undefined;
  }
  return Math.max(...this);
};

// Method to shuffle the elements of the array (Fisher-Yates shuffle algorithm)
Array.prototype.shuffle = function () {
  // Loop through the array in reverse order
  for (let i = this.length - 1; i > 0; i--) {
    // Generate a random index between 0 and the current index
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at positions i and j
    [this[i], this[j]] = [this[j], this[i]];
  }
  // Return the shuffled array
  return this;
};

// Method to remove duplicates from the array
Array.prototype.removeDuplicates = function () {
  //assign the unique values via new Set()
  return [...new Set(this)];
};

// Example usage:
const integarArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, -5, -2, 90, 10, 0];
console.log("Original array:", integarArray);

const largestElement = integarArray.findLargest();
console.log("Largest element:", largestElement);

const shuffledArray = integarArray.shuffle();
console.log("Shuffled array:", shuffledArray);

const uniqueArray = integarArray.removeDuplicates();
console.log("Array without duplicates:", uniqueArray);
