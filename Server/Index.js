const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Recipe = require('./Model/Schema');
const Contact = require('./Model/Contact');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
 


mongoose.connect('mongodb://localhost:27017/siterecipe', {
     
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

const PORT = 8000;

app.post("/recipe", async (req, res) => {
    const body = req.body;
    try {
        const newRecipe = new Recipe({
            title: body.title,
            ingredients: body.ingredients.map(ingredient => ({ name: ingredient.name, quantity: ingredient.quantity })),
            instructions: body.instructions.map((instruction, index) => ({ stepNumber: index + 1, description: instruction.description })),
            image: body.image,
            rcategory: body.rcategory,
        });

        await newRecipe.save();

        res.json({ status: "ok" });
    } catch (error) {
        console.error('Error saving form data', error);
        res.status(500).send('Error saving form data');
    }
});

app.get("/allrecipes/:rcategory", async (req, res) =>{
    const rcategory = req.params.rcategory;

    try{

        const data = await Recipe.find({rcategory: rcategory});
        res.status(200).json(data)

    }

    catch(error) {

        res.status(500).send('Error')
      }
    


})

app.get("/allrecipes/:rcategory/:recipeId", async (req, res) =>{

const {recipeId} = req.params
try{
const recipe = await Recipe.findById(recipeId)
res.status(200).json(recipe)

}

catch(error) {

    res.status(500).send('Error')
  }



})

// Delete a recipe by ID
app.delete('/allrecipes/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
      await Recipe.findByIdAndDelete(recipeId);
      res.status(200).send({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting recipe', error });
    }
  });
  



//Uer queries

app.post("/contact", async (req, res) => {
const body = req.body;

try {

const contactInfo = new Contact ({

name : body.name,
email : body.email,
querry : body.querry 




}
)
await contactInfo.save()

res.json({ status: "OK" })


}

catch (error) {
    console.error('Error saving form data', error);
    res.status(500).send('Error saving form data');
}




})


app.listen(PORT, () => console.log(`Server ${PORT} started successfully`));
