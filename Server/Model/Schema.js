const mongoose = require('mongoose');
 
const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String
});

const instructionSchema = new mongoose.Schema({
  stepNumber: Number,
  description: String
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: [instructionSchema],
  image:String,
  rcategory: String,
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
