import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../components/auth";

const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);
  return <div>{user ? children : null}</div>;
};

export default UserRoute;
