import "@/styles/globals.css";
import InitAppWrapper from "@/wrappers/InitAppWrapper";
import type { AppProps } from "next/app";
import { Providers } from "./provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <InitAppWrapper>
        <Component {...pageProps} />
      </InitAppWrapper>
    </Providers>
  );
}