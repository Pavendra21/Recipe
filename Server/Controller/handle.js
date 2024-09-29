 const Contact = require('../Model/Contact');
const Recipe = require('../Model/Schema');
const Signup = require('../Model/Signup');
const { setUser } = require('../Service/jwt');
const bcrypt = require('bcrypt');  // For password hashing

// Adding Recipes
const addRecipe = async (req, res) => {
    const body = req.body;
    try {
        // Input validation
        if (!body.title || !body.ingredients || !body.instructions || !body.rcategory) {
            return res.status(400).send('All fields are required');
        }

        const newRecipe = new Recipe({
            title: body.title,
            ingredients: body.ingredients.map(ingredient => ({
                name: ingredient.name, 
                quantity: ingredient.quantity
            })),
            instructions: body.instructions.map((instruction, index) => ({
                stepNumber: index + 1, 
                description: instruction.description
            })),
            image: body.image,
            rcategory: body.rcategory,
        });

        await newRecipe.save();
        res.json({ status: "ok" });
    } catch (error) {
        console.error('Error saving recipe', error);
        res.status(500).send('Error saving recipe');
    }
};

// Fetch all recipes by category
const allrecipes = async (req, res) => {
    const rcategory = req.params.rcategory;

    try {
        const data = await Recipe.find({ rcategory });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error fetching recipes');
    }
};

// Fetch a single recipe by ID
const recipe = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).send('Error fetching recipe');
    }
};

// Delete a recipe by ID
const remove = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        if (!deletedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.status(200).send({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting recipe', error });
    }
};

// User Contact Information
const user = async (req, res) => {
    const { name, email, querry } = req.body;

    try {
        if (!name || !email || !querry) {
            return res.status(400).send('All fields are required');
        }

        const contactInfo = new Contact({
            name,
            email,
            querry
        });

        await contactInfo.save();
        res.json({ status: "OK" });
    } catch (error) {
        console.error('Error saving contact info', error);
        res.status(500).send('Error saving contact info');
    }
};

// Signup
const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Basic validation
        if (!name || !email || !password || !phone) {
            return res.status(400).send('All fields are required');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const details = new Signup({
            name,
            email,
            password: hashedPassword,  // Save the hashed password
            phone
        });

        await details.save();
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error('Error during signup', err);
        res.status(500).send('Error during signup');
    }
};

// Login
const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Find the user by email
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // Generate token
        const token = setUser(user);
        res.cookie('uid', token, { httpOnly: true, secure: false, sameSite: 'LAX' });

        return res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).send('Internal server error');
    }
};

module.exports = { addRecipe, remove, allrecipes, user, recipe, signup, login };
