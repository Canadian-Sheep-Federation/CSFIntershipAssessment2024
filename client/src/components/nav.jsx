import { FaPlus } from "react-icons/fa6";
export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 fixed z-50 py-2">
        <div className="flex-none">
         
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl" href="/">Dogstagram</a>
        </div>
        <div className="flex-none">
          <a className="btn btn-primary" href="/new-post">
            <FaPlus/>
            New Post
          </a>
        </div>
      </div>
    </>
  );
}
