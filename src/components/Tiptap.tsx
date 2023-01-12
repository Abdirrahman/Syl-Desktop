import Image from "@tiptap/extension-image";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import { generateJSON } from "@tiptap/html";
import { pb, currentUser } from "./auth";

export default () => {
  const [content, setContent] = useState<any>(
    JSON.parse(localStorage?.getItem("html"))
  );
  const [chapter, setChapter] = useState<any>("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Typography,
      CharacterCount,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor?.getHTML();
      localStorage.setItem("html", JSON.stringify(html));
    },
  });

  // const html = editor?.getHTML();
  // const json = JSON.stringify(editor?.getJSON());
  // console.log(json);
  // console.log(pb.authStore.model);

  // console.log(JSON.stringify(json));

  // if (html !== undefined) {
  //   const json = generateJSON(html, [StarterKit]);
  //   console.log(json);
  // }

  const createPost = async () => {
    console.log("pressed.");
    const data = {
      post: editor?.getJSON(),
      author: currentUser?.id,
    };
    console.log(JSON.stringify(currentUser));
    await pb.collection("posts").create(JSON.stringify(data));
  };

  return (
    <>
      <input
        placeholder="Title.."
        className="posttitle"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <div className="pos">{editor ? <MenuBar editor={editor} /> : null}</div>
      <div className="edit">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              strike
            </button>
          </BubbleMenu>
        )}
        <EditorContent
          className="editor"
          editor={editor}
          onChange={() => setContent(editor?.getText())}
        />
        <div className="character-count">
          {editor?.storage.characterCount.characters()} characters
          <br />
          {editor?.storage.characterCount.words()} words
          <br />
          <button className="post-button" onClick={createPost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};
