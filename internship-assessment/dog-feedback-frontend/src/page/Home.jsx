import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const getAllQuotes = async () => {
      const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
      console.log(data.message)
      setData(data.message);
    };

    getAllQuotes();
  }, []);

  const search = (e) => {
    e.preventDefault();
    navigate(`breed/${searchInput}`)
  }

  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-5 py-4">
      <div className="flex flex-col sm:flex-row px-2 gap-4 justify-between items-center">
        <p className="italic text-xs font-bold">
          Click the breed below to get the random image or search for random
          image
        </p>
        <form className="relative w-72 sm:w-60" onSubmit={search}>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            className=" border-2 py-1 pl-2 pr-8 w-full text-black"
            type="text"
            placeholder="Enter breed "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-6 absolute top-1/2 -translate-y-1/2 right-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </form>
      </div>
      <h1 className="text-2xl font-semibold px-2">List of breeds</h1>
      <div className="flex gap-4 flex-wrap px-2">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <div className="border-2 p-2 flex-1" key={key}>
              <Link to={`breed/${key}`}>{key}</Link>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
