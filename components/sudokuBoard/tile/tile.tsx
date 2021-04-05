import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import styles from "./tile.module.css";

export default function Tile({
  value,
  onChange,
  staticTile,
}: {
  value: number | null;
  onChange: (newValue: number | null) => void;
  staticTile: boolean;
}): ReactElement {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <input
      className={styles.input}
      disabled={staticTile}
      value={currentValue ?? ""}
      onChange={(e) => {
        const value = e.currentTarget.value;
        const numberValue = Number(value);
        const valueIsNumber = numberValue.toString() === value;

        if (value.length === 1 && valueIsNumber) {
          setCurrentValue(numberValue);
        } else if (value.length === 0) {
          setCurrentValue(null);
        }
      }}
      onBlur={() => onChange(currentValue)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          document.body.focus();
        }
      }}
    />
  );
}
