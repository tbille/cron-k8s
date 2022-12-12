import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/api/logout");
  }, []);

  return <div>Loading</div>;
};

export default Logout;
