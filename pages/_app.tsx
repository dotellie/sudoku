import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
