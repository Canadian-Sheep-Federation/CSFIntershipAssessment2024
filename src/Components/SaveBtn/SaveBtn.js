import React from "react";

export default function SaveBtn({ breed, imageUrl, dogName, description }) {
  const handleSaveToMemories = () => {
    if (!breed || !imageUrl || !dogName || !description) {
      alert("Please select a breed and fill out the form before saving.");
      return;
    }

    const savedBreeds = JSON.parse(localStorage.getItem('breeds')) || [];
    savedBreeds.push({ breed, imageUrl, dogName, description });
    localStorage.setItem('breeds', JSON.stringify(savedBreeds));
    alert("Saved to Memories!");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleSaveToMemories}
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-40 h-40"
      >
        Save To Memories
      </button>
    </div>
  );
}
