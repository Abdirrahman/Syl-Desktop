import { createContext, useState, useEffect, useContext } from "react";
import { pb } from "../components/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

interface Props {
  children: React.ReactNode;
}
interface UserType {
  email: string | undefined;
}
export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loadinng, setLoadinng] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = pb.authStore.token;
      if (token) {
        console.log("user here");
        const currentUser = pb.authStore.model?.id;
        // setUser({currentUser});
      }
      setLoadinng(false);
    }
  }, []);

  const signUp = (email: string, password: string) => {
    return pb.collection("users").create({
      email: email,
      password: password,
      passwordConfirm: password,
    });
  };

  const logIn = (email: string, password: string) => {
    return pb.collection("users").authWithPassword(email, password);
  };

  const logOut = () => {
    pb.authStore.clear();
    setUser(pb.authStore.model?.id);
  };
  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loadinng ? null : children}
    </AuthContext.Provider>
  );
};
