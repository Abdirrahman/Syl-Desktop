import { useState } from "react";
import Nav from "../components/Nav";
import { pb } from "../components/auth";

export default function Explore() {
  const [posts, setPosts] = useState<any>([]);

  const results = async () => {
    const records = await pb
      .collection("posts")
      .getList(1, 20 /* batch size */, {
        sort: "-created",
        expand: "author",
      });
    let show = records.items.map(function (element) {
      return `${element}`;
    });
    setPosts(records.items);
    console.log(records);
    console.log(posts);
  };

  return (
    <div>
      <Nav />
      <button onClick={results}>RR</button>
      <h1>Hi</h1>{" "}
    </div>
  );
}

// const Post = ({ item, setPosts, posts }: any) => {
//   return (
//     <div className="flex items-center px-3 py-2 space-x-2 bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 max-h-16">
//       <input
//         type="checkbox"
//         className="w-5 h-5 bg-blue-200 rounded-full cursor-pointer focus:ring-0 focus:ring-offset-0"
//         defaultChecked={item.done}
//         onClick={() => {
//           setPosts([
//             ...posts.map((post: any) => {
//               //   if (post.id === item.id) {
//               //     post.done = !post.done;
//               //   }
//               return post;
//             }),
//           ]);

//           // updatepost({
//           //   rec_id: item.id,
//           //   data: {
//           //     post: item.post,
//           //     done: !!item.done,
//           //   },
//           // });
//         }}
//       />
//       <p
//         className={`text-white text-lg  leading-none ${
//           item.done ? "line-through" : ""
//         }`}
//       >
//         {item.post}
//       </p>
//     </div>
//   );
// };

// <div>
// {posts.length > 0 ? (
//   posts.map((post: any) => (
//     <Post
//       key={post.id}
//       item={post}
//       posts={posts}
//       setPosts={setPosts}
//       post={post}
//     />
//   ))
// ) : (
//   <p> nothing here</p>
// )}
// </div>
