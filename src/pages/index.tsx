import { CreateUserAndLoginButton, LoginButton, LogoutButton } from "@/components/LoginForm";
import { CreateFileForm } from "@/modules/files/fileComponents";
import { useAuthDataStore } from "@/stores/authDataStore";
import { useFilesStore } from "@/stores/filesStore";
// import { useFilesStore } from "@/stores/filesStore";
import { File } from "lucide-react";

export default function Page() {
  // const [files, setFiles] = useState<TFile[]>([]);
  const filesStore = useFilesStore();

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

        {isLoggedIn && (
          <>
            <LogoutButton onLogoutAttempt={() => {}} />
            <br />
            <br />
            <div className="flex flex-wrap gap-4">
              {filesStore.data.map((file) => (
                <span key={file.id} className="flex cursor-pointer flex-col items-center gap-2">
                  <File size={48} />
                  <span>{file.filePath}</span>
                </span>
              ))}
            </div>
            <CreateFileForm />
            <br />
            <br />
          </>
        )}

        {!isLoggedIn && (
          <>
            <LoginButton onLoginAttempt={() => {}} />
            <br />
            <br />
            <CreateUserAndLoginButton onFinish={() => {}} />
          </>
        )}
        {/* <pre>
          {JSON.stringify({ auth: authDataStore.data, files: filesStore.data }, undefined, 2)}
        </pre> */}
      </div>
    </div>
  );
}
