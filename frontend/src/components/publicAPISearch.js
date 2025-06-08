import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';


const MealSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  //handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/search?name=${searchTerm}`);
      console.log("response>>>>>>>>", response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMeals(data.meals || []);
      console.log(data.meals);
    } catch (err) {
      setError('Failed to fetch meals.');
    }
  };

 return (

      <div class="flex flex-col justify-center items-center p-4 min-h-screen">
        <div class="relative w-full max-w-sm mb-6">
          <input
            class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-24 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter meal name"
            value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);  
              }
            }}
          />
          <button
            type="button"
            onClick={handleSearch}
            class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center rounded-md bg-slate-800 px-3 py-1.5 text-sm text-white shadow-sm hover:bg-slate-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1.5">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>
            Search
          </button> 
        </div>


        {error && (
          <div className="mb-4 w-full max-w-sm bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl">
         {meals.length > 0 ? (
           meals.map((meal) => (
             <div key={meal.idMeal} className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
               <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
               <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{meal.strMeal}</h3>
                <div className="flex justify-between">
                  
                  <Link to={`/review/${meal.idMeal}`}
                    state={{
                      mealId: meal.idMeal,
                      mealTitle: meal.strMeal,
                      mealImage: meal.strMealThumb,
                    }}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                      Review Me
                    </button>
                  </Link>
                  
                  <Link to={`/meal/${meal.idMeal}`}>
                  <button className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 text-sm">
                    Details
                  </button>
                  </Link>

                </div>
              </div>
            </div>
           ))
         ) : (
           <p className="text-slate-500 col-span-full text-center">Search to get started !!</p>
         )}
       </div>

      </div>
    );
}

export default MealSearch;