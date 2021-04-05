import type { ReactElement } from "react";
import { useMemo } from "react";

import SudokuBoard from "../sudokuBoard/sudokuBoard";

import generateBoard from "./generateBoard";

const predefinedNumbersMap = {
  easy: 30,
  medium: 20,
  hard: 10,
};

export default function SudokuGame({
  difficulty,
  seed,
}: {
  difficulty: "easy" | "medium" | "hard";
  seed: string;
}): ReactElement {
  const { defaultValues, staticIndices, correctValues } = useMemo(
    () => generateBoard(predefinedNumbersMap[difficulty], seed),
    [difficulty, seed]
  );

  return (
    <SudokuBoard
      staticIndices={staticIndices}
      values={defaultValues}
      onValueChange={() => {}}
    />
  );
}
