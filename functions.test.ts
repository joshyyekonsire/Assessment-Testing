const { shuffleArray } = require("./utils");

describe("shuffleArray should", () => {
  test("shuffle the elements of an array", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray).not.toEqual(originalArray);
  });
  test("contain the same elements as the original array", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray.sort()).toEqual(originalArray.sort());
  });
  test("return an array of the same length as the argument sent in", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray.length).toEqual(originalArray.length);
  });
});
