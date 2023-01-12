import React, { useState } from "react";
import Link from "next/link";
import { pb } from "./auth";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [logged, setLogged] = useState(true);
  const { logOut } = useAuth();
  const handleLogout = () => {
    logOut();
    router.push("login");
  };

  return (
    <>
      <div className="nav">
        <div>
          <Link href="/">Home</Link>
        </div>

        <div>
          <Link href="explore">Explore</Link>
        </div>
        <div>
          <Link href="create">Create</Link>
        </div>
        <div>
          <Link href="login">Login</Link>
        </div>
        <div>
          {" "}
          <a onClick={handleLogout}>Logout</a>{" "}
        </div>
      </div>
    </>
  );
};

export default Nav;
