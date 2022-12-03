import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { reset } from "../src/styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
        />
      </Head>
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
}
