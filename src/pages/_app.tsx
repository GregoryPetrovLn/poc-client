import Header from "@/components/Header";
import "@/styles/globals.css";
import InitAppWrapper from "@/wrappers/InitAppWrapper";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <InitAppWrapper>
        <Toaster />
        <div className="h-screen overflow-y-scroll bg-slate-100">
          <Header />
          <Component {...pageProps} />
        </div>
      </InitAppWrapper>
    </Providers>
  );
}
