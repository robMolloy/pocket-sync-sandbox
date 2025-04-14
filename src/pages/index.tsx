import { CreateUserButton, LoginButton, LogoutButton } from "@/components/LoginForm";
import {
  CreateFileForm,
  ListFilesButton,
  SubscribeToFilesButton,
} from "@/modules/files/fileComponents";
// import { useFilesStore } from "@/stores/filesStore";
import { useState } from "react";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const filesStore = useFilesStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
        <div className="aspect-video rounded-xl bg-muted/50 p-3">asd</div>
      </div> */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-3 md:min-h-min">
        <h1>{isLoggedIn ? "Logged in" : "Logged out"}</h1>
        {isLoggedIn && (
          <>
            <LogoutButton
              onLogoutAttempt={(x) => {
                if (x.success) setIsLoggedIn(false);
              }}
            />
            <br />
            <br />
            <SubscribeToFilesButton
              onChange={(e) => {
                console.log(`index.tsx:${/*LL*/ 34}`, { e });
              }}
            />
            <br />
            <br />
            <ListFilesButton />
            <br />
            <br />
            <CreateFileForm />
          </>
        )}

        {!isLoggedIn && (
          <>
            <LoginButton
              onLoginAttempt={(x) => {
                if (x.success) setIsLoggedIn(true);
              }}
            />
            <br />
            <br />
            <CreateUserButton
              onCreateUserAttempt={(x) => {
                if (x.success) setIsLoggedIn(true);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
