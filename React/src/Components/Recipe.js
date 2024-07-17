import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { rcategory, recipeId } = useParams();
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/allrecipes/${rcategory}/${recipeId}`);
         setMainData(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchData();
  }, [rcategory, recipeId]);

  if (!mainData) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <>
      <section className="text-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-md h-100 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src={mainData.image} />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{mainData.title}</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">Category: {mainData.rcategory}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left light">
                <div className="leading-relaxed text-lg mb-4">
                  <h3 className='Link mb-3 my-4'> Ingredients: </h3>
                  <ol>
                    {mainData.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.quantity} {ingredient.name}</li>
                    ))}
                  </ol>
                </div>
                <div className="leading-relaxed text-lg mb-4">
                  <h3 className='Link mb-3 my-4'>Instructions:</h3>
                  {mainData.instructions.map((instruction, index) => (
                    <div key={index}>
                      <strong>Step {instruction.stepNumber}:</strong> {instruction.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipe;
