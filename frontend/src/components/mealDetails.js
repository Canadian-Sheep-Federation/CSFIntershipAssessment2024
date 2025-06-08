import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom'; 


const MealDetails = () => {
  const { id } = useParams();
  console.log('id>>>>',id)
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');

  //handle search
   useEffect(() => {
    const fetchMeal = async () => {
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/search/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();


        if (data.meal && data.meal.length > 0) {
          setMeal(data.meal[0]);
        } else {
          setError('Meal not found.');
        }
      } catch (err) {
        setError('Failed to fetch meal.');
      }
    };

    fetchMeal();
  }, [id]);



  // combinging ingredients and measurments 
  const getIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
        }
    }

    return ingredients;
    };


    if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!meal) {
    return <div className="p-4 text-slate-500">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">


      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-slate-600 hover:text-slate-800 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>


      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded mb-4" />

      <p className="mb-2"><strong>Category:</strong> {meal.strCategory}</p>

      <p className="mb-2"><strong>Area:</strong> {meal.strArea}</p>

      <p className="mb-2"><strong>Ingredients: </strong></p>
      <ul className="list-disc list-inside mb-4 text-slate-700">
        {getIngredients().map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="mb-2"><strong>Instructions:</strong></p>
      <p className="text-slate-700 whitespace-pre-line">{meal.strInstructions}</p>
    </div>
  );

}

export default MealDetails;