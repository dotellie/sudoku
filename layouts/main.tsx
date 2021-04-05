import Head from "next/head";
import type { ReactElement, ReactNode } from "react";

import styles from "../styles/MainLayout.module.css";

export default function MainLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactElement {
  return (
    <>
      <Head>
        <title>{title} - Sudoku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header>
          <h1>{title}</h1>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
