import type { ReactElement } from "react";
import { useCallback, useState, useMemo } from "react";

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

  const [values, setValues] = useState(defaultValues);
  const handleValueChange = useCallback(
    (index: number, newValue: number | null) => {
      setValues((values) =>
        values.map((v, i) => {
          if (index === i) {
            return newValue;
          } else {
            return v;
          }
        })
      );
    },
    []
  );

  return (
    <SudokuBoard
      staticIndices={staticIndices}
      values={values}
      correctValues={correctValues}
      onValueChange={handleValueChange}
    />
  );
}
