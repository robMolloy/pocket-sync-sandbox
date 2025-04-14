import { pb } from "@/config/pocketbaseConfig";
import { createUser, loginWithPassword, logout } from "@/modules/auth/dbAuthUtils";
import { Button } from "./ui/button";

export const LoginButton = (p: { onLoginAttempt: (x: { success: boolean }) => void }) => {
  return (
    <Button
      onClick={async () => {
        const resp = await loginWithPassword({
          pb,
          email: "rob@rob.com",
          password: "rob@rob.com",
        });
        p.onLoginAttempt(resp);
      }}
    >
      Log in
    </Button>
  );
};

export const LogoutButton = (p: { onLogoutAttempt: (x: { success: boolean }) => void }) => {
  return (
    <Button
      onClick={async () => {
        const resp = logout({ pb });
        p.onLogoutAttempt(resp);
        console.log(resp.success ? "logout successful" : "logout failed");
      }}
    >
      Log out
    </Button>
  );
};

export const CreateUserButton = (p: { onCreateUserAttempt: (x: { success: boolean }) => void }) => {
  return (
    <Button
      onClick={async () => {
        const resp = await createUser({
          pb,
          data: { email: "rob@rob.com", password: "rob@rob.com" },
        });

        p.onCreateUserAttempt(resp);
      }}
    >
      CreateUserButton
    </Button>
  );
};
