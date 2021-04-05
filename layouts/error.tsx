import Header from "next/head";
import type { ReactElement, ReactNode } from "react";

export default function ErrorLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <>
      <Header>
        <title>Error - Sudoku</title>
      </Header>
      <div>
        <h1>Oops!</h1>
        <p>{children}</p>
      </div>
    </>
  );
}
