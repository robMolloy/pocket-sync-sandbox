import { ModeToggle } from "@/components/mode-toggle";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ModeToggle />
      <Component {...pageProps} />
    </>
  );
}
