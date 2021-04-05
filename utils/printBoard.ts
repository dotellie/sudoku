/**
 * Prints a sudoku board to the console.
 *
 * Only shows up correctly if the console being printed to is using a monospace font.
 *
 * @param values The sudoku board to print
 * @throws If the `values` array is not the length of a sudoku board
 */
export default function printBoard(values: Array<number | null>): void {
  if (values.length !== 9 * 9) {
    throw new Error(`Invalid board length: ${values.length}`);
  }

  let board = "";

  values.forEach((value, index) => {
    board += value ?? " ";

    if (index === 9 * 9 - 1) return;

    if ((index + 1) % 3 === 0) {
      if ((index + 1) % (9 * 3) === 0) {
        board += "\n━━━━━╋━━━━━╋━━━━━\n";
      } else if ((index + 1) % 9 === 0) {
        board += "\n";
      } else {
        board += "┃";
      }
    } else {
      board += " ";
    }
  });

  // eslint-disable-next-line no-console
  console.log(board);
}
