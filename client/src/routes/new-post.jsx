import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

async function getImageURL() {
  try {
    const request = await fetch("https://dog.ceo/api/breeds/image/random");
    const response = await request.json();
    return response.message;
  } catch (error) {
    return "";
  }
}

export default function NewPost() {
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(false);

  const initialForm = {
    postName: "",
    tag: "",
    comment: "",
    imageURL: "",
  };

  const [formValues, setFormValues] = useState(initialForm);

  useEffect(() => {
    (async () => {
      const image = await getImageURL();
      setImageURL(image);
      setFormValues((prevValues) => ({ ...prevValues, imageURL: image }));
    })();
  }, []);

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitPost = async (postData) => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      setError(false)
      if (data.message) {
        alert(`Post ${data.message} successfully created`);
      }
    } catch (error) {

      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000);
           
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPost(formValues);
  };

  return (
    <>
      <div className="flex flex-col items-center">

      <div className="flex mt-20 mb-6 gap-4">
          <a href="/">
            {" "}
            <IoMdArrowRoundBack size={36} />
          </a>

          <h1 className="text-3xl font-bold ">New Post</h1>
        </div>



        <div className="mb-6">
          <img
            src={imageURL}
            className="object-contain h-48 w-96"
            alt="Random Dog"
          />
        </div>

        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-96 items-center">
            <input
              type="text"
              name="postName"
              placeholder="Name of post"
              className="input input-bordered w-full"
              required
              onChange={formHandler}
            />
            <select
              name="tag"
              className="select w-full"
              defaultValue=""
              onChange={formHandler}
              required
            >
              <option disabled value="">
                Select a tag
              </option>
              <option value="Outside">Outside</option>
              <option value="Inside">Inside</option>
              <option value="Small Dog">Small Dog</option>
              <option value="Large Dog">Large Dog</option>
            </select>
            <textarea
              name="comment"
              placeholder="Add a comment"
              className="textarea w-full textarea-bordered"
              onChange={formHandler}
              required
            />

            <label className="form-control w-full ">
              <button type="submit" className="btn btn-outline w-full">
                Create Post
              </button>
              <div className="label">
                <span className="label-text-alt"></span>
                {error && (
                  <span className="label-text-alt text-error">
                    Could not create post.
                  </span>
                )}
              </div>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
