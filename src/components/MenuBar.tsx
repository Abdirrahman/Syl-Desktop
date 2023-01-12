import React, { useCallback } from "react";
import { Editor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { open, message } from "@tauri-apps/api/dialog";
import { appConfigDir } from "@tauri-apps/api/path";

interface IMenubarProp {
  editor: Editor;
}

export default function MenuBar({ editor }: IMenubarProp) {
  const getFocus = () => editor.chain().focus();
  const isActive = (type: string, options?: any) => {
    return editor.isActive(type, options ?? {}) ? "is-active" : "";
  };
  // const addImage = useCallback(() => {
  //   const url = async function () {
  //     const selected = await open({
  //       directory: true,
  //       multiple: false,
  //       defaultPath: await appConfigDir(),
  //     });
  //     if (Array.isArray(selected)) {
  //       // user selected multiple directories
  //       await message("Only select one image.");
  //     } else if (selected === null) {
  //       // user cancelled the selection
  //     } else {
  //       // user selected a single directory
  //       editor.chain().focus().setImage({ src: selected[0] }).run();
  //     }
  //   };
  //   console.log("img p");

  //   // if (url) {
  //   //   editor.chain().focus().setImage({ src: url }).run();
  //   // }
  // }, [editor]);

  const addImage = async () => {
    const selected = await open({
      multiple: false,
      defaultPath: await appConfigDir(),
    });
    if (Array.isArray(selected)) {
      // user selected multiple directories
      await message("Only select one image.");
    } else if (selected === null) {
      // user cancelled the selection
      console.log("null?");
    } else {
      // user selected a single directory
      editor.chain().focus().setImage({ src: selected[0] }).run();
    }
    console.log("img p");
  };

  const menus = [
    [
      // {
      //   icon: "bold",
      //   onClick: () => getFocus().toggleBold().run(),
      //   isActive: isActive("bold"),
      // },
      // {
      //   icon: "italic",
      //   onClick: () => getFocus().toggleItalic().run(),
      //   isActive: isActive("italic"),
      // },
      // {
      //   icon: "strikethrough",
      //   onClick: () => getFocus().toggleStrike().run(),
      //   isActive: isActive("strike"),
      // },
      // ],
      // [
      {
        icon: "h-1",
        onClick: () => getFocus().toggleHeading({ level: 1 }).run(),
        isActive: isActive("heading", { level: 1 }),
      },
      {
        icon: "h-2",
        onClick: () => getFocus().toggleHeading({ level: 2 }).run(),
        isActive: isActive("heading", { level: 2 }),
      },
      {
        icon: "list-unordered",
        onClick: () => getFocus().toggleBulletList().run(),
        isActive: isActive("bulletList"),
      },
      {
        icon: "list-ordered",
        onClick: () => getFocus().toggleOrderedList().run(),
        isActive: isActive("orderedList"),
      },
      // ],
      // [
      {
        icon: "double-quotes-l",
        onClick: () => getFocus().toggleBlockquote().run(),
        isActive: isActive("blockquote"),
      },
      {
        icon: "separator",
        onClick: () => getFocus().setHorizontalRule().run(),
      },
      {
        icon: "image-line",
        onClick: addImage,
      },
      {
        icon: "align-left",
        onClick: () => getFocus().setTextAlign("left").run(),
        isActive: isActive("left", { textAlign: "left" }),
      },
      {
        icon: "align-center",
        onClick: () => getFocus().setTextAlign("center").run(),
        isActive: isActive("center", { textAlign: "center" }),
      },
      {
        icon: "align-right",
        onClick: () => getFocus().setTextAlign("right").run(),
        isActive: isActive("right", { textAlign: "right" }),
      },
    ],
  ];

  return (
    <div className="menu">
      {menus.map((group) => {
        return (
          <div className="group-item">
            {group.map((item) => {
              return (
                <button
                  className="menu-item"
                  onClick={item.onClick}
                  title={item.icon}
                >
                  <i className={`ri-${item.icon} ${item.isActive}`}></i>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
