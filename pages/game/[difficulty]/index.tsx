import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect } from "react";

export default function NoSeedRedirect(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const { difficulty } = router.query;

    const newDifficulty = typeof difficulty === "string" ? difficulty : "easy";
    const newSeed = Math.floor(Math.random() * 1000000000).toString();

    void router.replace(`/game/${newDifficulty}/${newSeed}`);
  }, [router]);

  return <></>;
}
