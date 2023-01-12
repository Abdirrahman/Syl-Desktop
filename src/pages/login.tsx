import { useEffect, useState } from "react";
import Nav from "../components/Nav";
// import signup from "../components/auth";
// import login from "../components/auth";
// import logout from "../components/auth";
import { pb } from "../components/auth";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

interface AuthProps {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  const { logIn, signUp } = useAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userData = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log(userData);
  };
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const user = await pb.collection("users").create({
      email: email,
      password: password,
      passwordConfirm: password,
    });
    console.log("signup");
    console.log(user);
    console.log(pb.authStore.isValid);
    const userData = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log(userData);
  };
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const user = await pb.collection("users").authWithPassword(email, password);
    console.log("here " + email, password);
    setLogged(pb.authStore.isValid);
  };

  if (logged) {
    router.push("create");
  }
  //   const signup = async ({ email, password }: AuthProps) => {
  //     const user = await pb.collection("users").create({ email, password });
  //     console.log("signup");
  //     return user;
  //   };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <div className="signup">
          <input
            type="email"
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
        </div>
      </form>
      <form onSubmit={handleSignIn}>
        <div className="login">
          <input
            type="email"
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </div>
      </form>
    </>
  );
}
