const size = 9;
const maxValue = 9;
const squareSize = 3;
const maxIndex = size * size;

/**
 * Converts an index to its position in a sudoku board
 *
 * @param index The index in a sudoku board
 * @returns The `[x, y]` position of the index
 */
function indexToPosition(index: number): [number, number] {
  const indexY = Math.floor(index / size);
  const indexX = Math.floor(index - indexY * size);

  return [indexX, indexY];
}

function positionToIndex(x: number, y: number): number {
  return y * size + x;
}

/**
 * Checks if a number exists within the square of an index in a sudoku board.
 *
 * Based on the visuals (not the code) of this post:
 * https://www.reddit.com/r/webdev/comments/me315z/i_made_a_website_that_visualises_backtracking_in/
 *
 * @param values The current assigned values for the sudoku board
 * @param index The index of the number to be checked
 * @param number The number to be checked
 * @returns `true` if the number is valid within the current state of the board, otherwise `false`
 */
function checkSquare(
  values: Array<number | null>,
  index: number,
  number: number,
): boolean {
  const [indexX, indexY] = indexToPosition(index);

  const startX = Math.floor(indexX / squareSize) * squareSize;
  const startY = Math.floor(indexY / squareSize) * squareSize;

  for (let x = startX; x < startX + squareSize; x++) {
    for (let y = startY; y < startY + squareSize; y++) {
      if (x === indexX && y === indexY) continue;

      const tileValue = values[positionToIndex(x, y)] ?? null;

      if (tileValue === number) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Checks if a number exists within the vertical line of an index in a sudoku board
 *
 * @param values The current assigned values for the sudoku board
 * @param index The index of the number to be checked
 * @param number The number to be checked
 * @returns `true` if the number is valid within the current state of the board, otherwise `false`
 */
function checkVerticalLine(
  values: Array<number | null>,
  index: number,
  number: number
): boolean {
  const [indexX, indexY] = indexToPosition(index);

  for (let y = 0; y < size; y++) {
    if (y === indexY) continue;

    const tileValue = values[positionToIndex(indexX, y)] ?? null;

    if (tileValue === number) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a number exists within the horizontal line of an index in a sudoku board
 *
 * @param values The current assigned values for the sudoku board
 * @param index The index of the number to be checked
 * @param number The number to be checked
 * @returns `true` if the number is valid within the current state of the board, otherwise `false`
 */
function checkHorizontalLine(
  values: Array<number | null>,
  index: number,
  number: number
): boolean {
  const [indexX, indexY] = indexToPosition(index);

  for (let x = 0; x < size; x++) {
    if (x === indexX) continue;

    const tileValue = values[positionToIndex(x, indexY)] ?? null;

    if (tileValue === number) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a number is valid within a sudoku board
 *
 * @param values The current assigned values for the sudoku board
 * @param index The index of the number to be checked
 * @param number The number to be checked
 * @returns `true` if the number is valid within the current state of the board, otherwise `false`
 */
function checkValidity(
  values: Array<number | null>,
  index: number,
  number: number
): boolean {
  return (
    checkSquare(values, index, number) &&
    checkVerticalLine(values, index, number) &&
    checkHorizontalLine(values, index, number)
  );
}

function lastNonPredeterminedIndex(
  predeterminedValues: Array<number | null>,
  index: number
): number {
  for (let i = index - 1; i >= 0; i--) {
    if (typeof predeterminedValues[i] !== "number") {
      return i;
    }
  }

  throw new Error("No possible non-predetermined value");
}

export default function backtrace(
  predeterminedValues: Array<number | null>
): number[] {
  let currentIndex = 0;
  const values = [...predeterminedValues];

  indexLoop: while (currentIndex < maxIndex) {
    // Continue if predetermined value
    if (typeof predeterminedValues[currentIndex] === "number") {
      currentIndex++;
      continue;
    }

    const currentIndexValue = values[currentIndex] ?? 1;

    // See if any value fits. If yes, move on to next value
    for (let v = currentIndexValue; v <= maxValue; v++) {
      const valid = checkValidity(values, currentIndex, v);

      if (valid) {
        values[currentIndex] = v;
        currentIndex++;
        continue indexLoop;
      }
    }

    // Go back to previous non-predetermined square if no values are possible
    const previousIndex = lastNonPredeterminedIndex(
      predeterminedValues,
      currentIndex
    );
    const previousValue = values[previousIndex];

    if (typeof previousValue !== "number") throw new Error("Back-trace failed");
    values[previousIndex] = previousValue + 1;

    values[currentIndex] = null;
    currentIndex = previousIndex;
  }

  const validatedValues = values.filter(
    (v): v is number => typeof v === "number"
  );

  if (values.length !== validatedValues.length) {
    throw new Error("Back-trace failed");
  }

  return validatedValues;
}
