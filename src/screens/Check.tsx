import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Check = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["token"], function (result) {
      let authToken = result.token.authToken;
      if (authToken) {
        setAuth(true);
      }
    });
  }, []);
  return <>{auth ? <Dashboard /> : <Login />}</>;
};

export default Check;
