import { FaSearch } from "react-icons/fa";

const SearchButton = () => {
  return (
    <div className='flex'>
      <div
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <FaSearch className='text-2xl' />
      </div>
    </div>
  );
};

export default SearchButton;