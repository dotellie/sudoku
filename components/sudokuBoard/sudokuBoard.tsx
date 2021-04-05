import type { ReactElement } from "react";
import { useMemo } from "react";

import styles from "./sudokuBoard.module.css";
import Tile from "./tile/tile";

export default function SudokuBoard({
  staticIndices,
  values,
  onValueChange,
}: {
  staticIndices: number[];
  values: Array<number | null>;
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
      {tileIndices.map((index) => (
        <Tile
          key={index}
          staticTile={staticIndicesSet.has(index)}
          value={values[index] ?? null}
          onChange={(newValue) => onValueChange(index, newValue)}
        />
      ))}
    </div>
  );
}
