import seedrandom from "seedrandom";

import backtrace from "./backtrace";

const maxIndex = 9 * 9;

/**
 * Generates a random value within a range
 *
 * @param rng RNG function to use for random numbers
 * @param min The minimum possible value to be generated (inclusive)
 * @param max The maximum possible value to be generated (non-inclusive)
 *
 * @returns A random number between `min` and `max`
 */
function randomRange(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min) + min);
}

/**
 * This mask is used for determining the initial values before solving with the back-tracer.
 * It could've also been an array with just the index positions which would result in slightly
 * faster performance, but it would also be less readable.
 */
// prettier-ignore
const seedPositionMask = [
  1,0,0, 0,0,0, 0,0,0,
  0,0,0, 1,0,0, 0,0,0,
  0,0,0, 0,0,0, 1,0,0,

  0,1,0, 0,0,0, 0,0,0,
  0,0,0, 0,1,0, 0,0,0,
  0,0,0, 0,0,0, 0,1,0,

  0,0,1, 0,0,0, 0,0,0,
  0,0,0, 0,0,1, 0,0,0,
  0,0,0, 0,0,0, 0,0,1,
].map(n => n === 1)

export default function generateBoard(
  predefinedNumbers: number,
  seed: string
): {
  defaultValues: Array<number | null>;
  staticIndices: number[];
  correctValues: number[];
} {
  const rng = seedrandom(seed);

  const board = Array(maxIndex)
    .fill(null)
    .map((_, index) => {
      if (seedPositionMask[index] ?? false) {
        return randomRange(rng, 1, 10);
      }
      return null;
    });

  const correctValues = backtrace(board);

  const staticIndicesSet = new Set<number>();
  for (let i = 0; i < predefinedNumbers; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
    while (true) {
      const index = randomRange(rng, 0, maxIndex);
      if (!staticIndicesSet.has(index)) {
        staticIndicesSet.add(index);
        break;
      }
    }
  }
  const staticIndices = Array.from(staticIndicesSet.values());

  const defaultValues = Array(maxIndex)
    .fill(null)
    .map((_, index) => {
      const correctValue = correctValues[index];
      if (staticIndicesSet.has(index) && typeof correctValue === "number") {
        return correctValue;
      } else {
        return null;
      }
    });

  return { defaultValues, staticIndices, correctValues };
}
