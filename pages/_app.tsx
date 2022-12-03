import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { reset } from "../src/styles/global";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global styles={reset} />
			<Component {...pageProps} />
		</>
	);
}
