import React from 'react';

export default function Form({ dogName, setDogName, description, setDescription }) {
  return (
    <div className="p-5 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-4">Name and Describe the Dog</h2>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          placeholder="Dog's Name"
          className="mb-2 p-2 border rounded w-full bg-white text-black"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mb-2 p-2 border rounded w-full bg-white text-black"
          required
        />
      </div>
    </div>
  );
}
