import React, { useEffect, useState } from "react";
import CameraRollPicture from '../../../src/Assets/Images/cameraRollPawsome.JPEG';

export default function Saved() {
  const [savedBreeds, setSavedBreeds] = useState([]);

  useEffect(() => {
    const breeds = JSON.parse(localStorage.getItem('breeds')) || [];
    setSavedBreeds(breeds);
  }, []);

  const handleDelete = (index) => {
    const newBreeds = [...savedBreeds];
    newBreeds.splice(index, 1);
    setSavedBreeds(newBreeds);
    localStorage.setItem('breeds', JSON.stringify(newBreeds));
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold text-white mb-4">Saved Camera Roll</h1>
      <div className="flex flex-col md:flex-row justify-center items-start gap-5">
        <div className="m-2 w-96 h-96 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex float items-center justify-center shadow-lg">
          <img className="W-80 h-80 rounded-full " src={CameraRollPicture} alt="cameraRoll" />
        </div>
        <div className="overflow-y-auto h-96 w-full md:w-96 bg-white rounded-lg shadow-lg m-2">
          <ul className="space-y-1 p-4">
            {savedBreeds.map((breed, index) => (
              <li key={index} className="bg-slate-300 rounded-lg flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer">
                <img
                  src={breed.imageUrl}
                  alt={`Random ${breed.breed}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex-grow px-2 text-sm font-medium">
                  <p>{"Name: "+breed.dogName}</p>
                  <p>{"Breed: "+breed.breed}</p>
                  <p>{"Deiscription: "+breed.description}</p>
                </div>
                <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25V6.75C6 5.508 7.01 4.5 8.25 4.5h7.5C16.49 4.5 17.5 5.508 17.5 6.75v1.5M4.875 8.25h14.25M9 12v4.5m1.5-4.5v4.5m1.5-4.5v4.5m1.5-4.5v4.5M9 17.25h6M7.5 8.25v10.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V8.25"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
