import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./sudokuBoard.module.css";
import Tile from "./tile/tile";

export default function SudokuBoard({
  staticIndices,
  values,
  correctValues,
  onValueChange,
}: {
  staticIndices: number[];
  values: Array<number | null>;
  correctValues: number[];
  onValueChange: (index: number, newValue: number | null) => void;
}): ReactElement {
  const tileIndices = useMemo(
    () =>
      Array(9 * 9)
        .fill(null)
        .map((_, index) => index),
    []
  );

  const staticIndicesSet = useMemo(() => new Set(staticIndices), [
    staticIndices,
  ]);

  return (
    <div className={styles.board}>
      <div className={styles.overlay}>
        <span className={styles.horizontalLines} />
        <span className={styles.verticalLines} />
      </div>
      {tileIndices.map((index) => {
        const value = values[index] ?? null;
        const correctValue = correctValues[index];

        const valid =
          typeof correctValue === "number"
            ? value === null || correctValue === value
            : true;

        return (
          <Tile
            key={index}
            staticTile={staticIndicesSet.has(index)}
            value={value}
            valid={valid}
            onChange={(newValue) => onValueChange(index, newValue)}
          />
        );
      })}
    </div>
  );
}
