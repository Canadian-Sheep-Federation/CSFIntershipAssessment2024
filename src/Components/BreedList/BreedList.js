import React, { useState, useEffect } from "react";

export default function BreedList({ onSelectBreed }) {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(response => response.json())
            .then(data => {
                setBreeds(Object.keys(data.message));
            });
    }, []);

    return (
        <div className="h-80 overflow-y-auto"  >  {/* Scrollable container */}
            <ul className="space-y-1 p-4">
                {breeds.map(breed => (
                    <li key={breed} onClick={() => onSelectBreed(breed)} className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-80 ">
                        {breed}
                    </li>
                ))}
            </ul>
        </div>
    );
}
