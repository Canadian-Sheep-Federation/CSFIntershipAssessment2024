import { useEffect, useState } from "react";
import Card from "../components/card";

async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();

    return data.posts;
  } catch (e) {
    return [];
  }
}

export default function Root() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      const temp = await getAllPosts();
      setPosts(temp);
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-20 mb-6">All Posts</h1>

        {posts && posts.length !==0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-items-center gap-4">
            {posts.map((post, index) => {
              return (
                <Card
                  key={index}
                  id={post.ID}
                  title={post.postName}
                  tag={post.tag}
                  comment={post.comment}
                  url={post.imageURL}
                />
              );
            })}
          </div>
        ) : (
          <div>No posts available. Create a new one!</div>
        )}
      </div>
    </>
  );
}
