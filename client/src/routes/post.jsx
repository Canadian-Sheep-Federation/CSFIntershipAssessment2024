import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Card from "../components/card";

async function getPost(id) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`);
    const data = await response.json();

    return data.posts[0];
  } catch (e) {
    return [];
  }
}

export default function Post() {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const post = await getPost(id);
      setPost(post);
      console.log(post);
    })();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex mt-20 mb-6 gap-4">
          <a href="/">
            {" "}
            <IoMdArrowRoundBack size={36} />
          </a>

          <h1 className="text-3xl font-bold ">{`Post ${id}`}</h1>
        </div>

        {post && (
          <Card
            id={post.ID}
            title={post.postName}
            tag={post.tag}
            comment={post.comment}
            url={post.imageURL}
          />
        )}
      </div>
    </>
  );
}
