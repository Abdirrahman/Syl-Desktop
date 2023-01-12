import Head from "next/head";
import Nav from "../components/Nav";
import Tiptap from "../components/Tiptap";
// import { useRouter } from "next/router";
import { useState } from "react";
import ProtectedRoute from "../context/ProtectedRoute";

export default function Create() {
  // const router = useRouter();
  //   const postsCollectionRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  //   const createPost = async () => {
  //     await addDoc(postsCollectionRef, {
  //       title,
  //       postText,
  //       author: {
  //         name: auth.currentUser?.displayName,
  //         id: auth.currentUser?.uid,
  //       },
  //     });
  //   };

  return (
    <div className="container">
      <Tiptap />
    </div>
  );
}
