import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { AuthContextProvider } from "../context/AuthContext";
import "remixicon/fonts/remixicon.css";
import "../style.scss";
import "../App.css";
import ProtectedRoute from "../context/ProtectedRoute";
import UserRoute from "../context/UserRoute";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
