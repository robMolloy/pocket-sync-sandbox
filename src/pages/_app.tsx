import { RootLayout } from "@/components/layouts/RootLayout";
import { pb } from "@/config/pocketbaseConfig";
import { smartSubscribeToFiles } from "@/modules/files/dbFilesUtils";
import { useAuthDataStore, useAuthDataSync } from "@/stores/authDataStore";
import { useFilesStore } from "@/stores/filesStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const authDataStore = useAuthDataStore();
  useAuthDataSync({ pb });

  const filesStore = useFilesStore();

  useEffect(() => {
    const isLoggedIn = !!authDataStore.data?.token;

    if (isLoggedIn) {
      smartSubscribeToFiles({ pb, onChange: (x) => filesStore.setData(x) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authDataStore.data]);
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
