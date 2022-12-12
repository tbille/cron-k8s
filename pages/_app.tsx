import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { RecoilRoot, useRecoilState } from "recoil";

import { userState } from "../state/user";

const User = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/whoami");
      const data = await res.json();

      if (data) {
        setUser(data);
      }
    };

    if (!user.email) {
      getUser();
    }
  }, []);

  return <span></span>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <User />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
