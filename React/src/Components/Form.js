import React, { useState } from 'react';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState('');
  const [rcategory, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, { name: ingredient }]);
      setIngredient('');
    }
  };

  const handleAddInstruction = () => {
    if (instruction.trim() !== '') {
      setInstructions([...instructions, { description: instruction }]);
      setInstruction('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title,
      ingredients,
      instructions,
      image,
      rcategory,
    };

    // Send recipe to backend

    fetch('https://recipe-production-505f.up.railway.app/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Recipe submitted:', data);
        setSubmitted(true);

        // Clear form after submission
         
        setTitle('');
        setIngredients([]);
        setInstructions([]);
        setImage('');
        setCategory('');
      })
      .catch(error => {
        console.error('Error submitting recipe:', error);
      });
  };

 

  if (submitted) {
    return <p className="position-absolute top-50 start-50 translate-middle Link"><strong>The Recipe has been submitted Successfully !!!</strong></p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">



      <div className="mb-4 " style={{ marginTop: "140px" }}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Recipe Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      
<div className="mb-4">
    <label htmlFor="validationCustom04" className="form-label block text-gray-700 text-sm font-bold mb-2">Choose Category</label>
    <select className="form-select" id="rcategory"
    value={rcategory}
    onChange={(event)=> setCategory(event.target.value)}
    required
    >

      <option selected disabled value=""></option>
      <option>Appetizers & Snacks</option>
      <option>Main Courses</option>
      <option>Desserts</option>
      <option>Salads</option>
      <option>Beverages</option>
      <option>Appetizers & Snacks</option>

    </select>
    <div className="invalid-feedback">
      Please select a valid state.
    </div>
  </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Add Image URL
        </label>
        <input
          id="image"
          type="text"
          onChange={(event) => setImage(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredient">
          Ingredient
        </label>
        <div className="flex">
          <input
            id="ingredient"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ingredients
        </label>
        <ul className="list-disc list-inside bg-gray-100 p-4 rounded">
          {ingredients.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instruction">
          Instruction
        </label>
        <div className="flex">
          <input
            id="instruction"
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddInstruction}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Instructions
        </label>
        <ol className="list-decimal list-inside bg-gray-100 p-4 rounded">
          {instructions.map((step, index) => (
            <li key={index}>{step.description}</li>
          ))}
        </ol>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
