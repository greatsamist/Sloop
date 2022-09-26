import { FC, Fragment, useEffect, useState } from "react";
import { Wallet } from "@mui/icons-material";
import { Button } from "@mui/material";
import UAuth from "@uauth/js";

const uauth = new UAuth({
  clientID: "9ba9e8d3-4a7b-4e69-ab6a-593415543435",
  redirectUri: "https://straps.vercel.app",
});

export const UDButton: FC = () => {
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState<UAuth | undefined | any>();

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  //Login/out Functions
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      {user ? (
        <Button
          variant="contained"
          endIcon={<Wallet />}
          sx={{
            textAlign: "center",
            alignItems: "center",
            margin: "50px 0",
            backgroundColor: "#FFA1A7",
            "&:hover": {
              backgroundColor: "#141414",
            },
          }}
          onClick={handleLogout}
        >
          Logout UD
        </Button>
      ) : error ? (
        "Login Error retry"
      ) : (
        <Button
          variant="outlined"
          onClick={handleLogin}
          endIcon={<Wallet />}
          sx={{
            textAlign: "center",
            alignItems: "center",
            margin: "50px 0",
          }}
        >
          Login With UD
        </Button>
      )}
    </Fragment>
  );
};
