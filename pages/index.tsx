import Link from "next/link";
import type { ReactElement } from "react";

import MainLayout from "../layouts/main";

export default function HomePage(): ReactElement {
  return (
    <MainLayout title="Main menu">
      <h2>Select your difficulty</h2>
      <Link href="/game/easy">Easy</Link>
      <br />
      <Link href="/game/medium">Medium</Link>
      <br />
      <Link href="/game/hard">Hard</Link>
    </MainLayout>
  );
}
