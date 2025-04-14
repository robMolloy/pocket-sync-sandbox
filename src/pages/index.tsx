import { CreateUserButton, LoginButton, LogoutButton } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { pb } from "@/config/pocketbaseConfig";
import { TFile } from "@/modules/files/dbFilesUtils";
import {
  CreateFileForm,
  ListFilesButton,
  SmartSubscribeToFilesButton,
  SubscribeToFilesButton,
} from "@/modules/files/fileComponents";
import { useAuthDataStore } from "@/stores/authDataStore";
// import { useFilesStore } from "@/stores/filesStore";
import { useState } from "react";

export default function Page() {
  const [files, setFiles] = useState<TFile[]>([]);
  // const filesStore = useFilesStore();

  const authDataStore = useAuthDataStore();
  const isLoggedIn = authDataStore.data?.token;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
      </div> */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-3 md:min-h-min">
        <h1>{authDataStore.data?.token ? "Logged in" : "Logged out"}</h1>

        <Button
          onClick={() => {
            console.log(`index.tsx:${/*LL*/ 81}`, { x: pb.authStore });
          }}
        >
          log auth
        </Button>
        <br />
        <br />

        {isLoggedIn && (
          <>
            <LogoutButton onLogoutAttempt={() => {}} />
            <br />
            <br />
            <SubscribeToFilesButton
              onChange={(e) => {
                console.log(`index.tsx:${/*LL*/ 34}`, { e });
              }}
            />
            <br />
            <br />
            <SmartSubscribeToFilesButton
              onChange={(x) => {
                setFiles(x);
              }}
            />
            <br />
            <br />
            <ListFilesButton />
            <br />
            <br />
            <CreateFileForm />
            <br />
            <br />
            <pre>{JSON.stringify(files, undefined, 2)}</pre>
          </>
        )}

        {!isLoggedIn && (
          <>
            <LoginButton onLoginAttempt={() => {}} />

            <br />
            <br />
            <CreateUserButton onFinish={() => {}} />
          </>
        )}
        <pre>{JSON.stringify({ x: authDataStore.data }, undefined, 2)}</pre>
      </div>
    </div>
  );
}
