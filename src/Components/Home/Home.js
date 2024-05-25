import React, { useState } from "react";
import BreedList from '../BreedList/BreedList';
import BreedImage from '../BreedImage/BreedImage';
import Form from '../Form/Form';
import SaveBtn from '../SaveBtn/SaveBtn';

export default function Home() {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dogName, setDogName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="m-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white font-medium text-sm px-5 py-2.5 flex flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold m-3">
          Select a dog breed from the list to view a random image of the dog.
        </h1>
      </header>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:gap-10 mx-auto p-4 w-full max-w-7xl mt-10">
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-xl hover:shadow-gray-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg p-4 h-full flex justify-center items-center">
          <BreedList onSelectBreed={setSelectedBreed} />
        </section>
        <div className="flex justify-center items-center">
          <Form 
            dogName={dogName} 
            setDogName={setDogName} 
            description={description} 
            setDescription={setDescription} 
          />
        </div>
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl hover:shadow-2xl hover:shadow-gray-600 transition-shadow duration-300 ease-in-out rounded-lg p-4 h-full flex justify-center items-center">
          <BreedImage breed={selectedBreed} onImageLoad={setImageUrl} />
        </section>
      </div>
      <div className="flex justify-center items-center mt-4">
        <SaveBtn breed={selectedBreed} imageUrl={imageUrl} dogName={dogName} description={description} />
      </div>
    </div>
  );
}
