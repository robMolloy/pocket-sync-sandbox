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
      }}
    >
      Log out
    </Button>
  );
};

export const CreateUserButton = (p: { onFinish: (x: { success: boolean }) => void }) => {
  return (
    <Button
      onClick={async () => {
        const email = "rob3@rob3.com";
        const password = "rob3@rob3.com";

        const resp = await createUser({ pb, data: { email, password } });
        if (!resp.success) return resp;

        const resp2 = await loginWithPassword({ pb, email, password });
        if (!resp2.success) return resp2;

        p.onFinish(resp);
      }}
    >
      CreateUserAndLoginButton
    </Button>
  );
};
