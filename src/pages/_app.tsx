import { RootLayout } from "@/components/layouts/RootLayout";
import { pb } from "@/config/pocketbaseConfig";
import { useAuthDataSync } from "@/stores/authDataStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useAuthDataSync({ pb });
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
