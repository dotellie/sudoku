import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

import SudokuGame from "../../../components/sudokuGame/sudokuGame";
import ErrorLayout from "../../../layouts/error";
import MainLayout from "../../../layouts/main";

export default function GamePage(): ReactElement | null {
  const router = useRouter();

  const { difficulty, seed } = router.query;

  if (typeof difficulty !== "string" || typeof seed !== "string") {
    return <ErrorLayout>An unknown error occurred</ErrorLayout>;
  }

  const readableDifficulty =
    (difficulty[0]?.toUpperCase() ?? "") + difficulty.slice(1);

  if (
    difficulty !== "easy" &&
    difficulty !== "medium" &&
    difficulty !== "hard"
  ) {
    return (
      <ErrorLayout>
        &quot;{readableDifficulty}&quot; is an invalid difficulty
      </ErrorLayout>
    );
  }

  const shareButton =
    "share" in navigator ? (
      <>
        <br />
        <button
          onClick={() =>
            void navigator
              .share({
                title: "Sudoku",
                text: `Check out this ${difficulty} sudoku board!`,
                url: location.href,
              })
              .catch(async () => Promise.resolve())
          }
        >
          Share this board
        </button>
      </>
    ) : null;

  return (
    <MainLayout title={`${readableDifficulty} game`}>
      <SudokuGame difficulty={difficulty} seed={seed} />
      <br />
      <Link href="/">Back to main menu</Link>
      {shareButton}
    </MainLayout>
  );
}
