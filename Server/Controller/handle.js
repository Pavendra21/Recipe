 const Contact = require('../Model/Contact');
const Recipe = require('../Model/Schema');
const Signup = require('../Model/Signup');
const {setUser} = require('../Service/jwt');


// Adding Recipes

const addRecipe = async (req, res) => {
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
};

// category vice all recipe will showing 

const allrecipes = async (req, res) => {
    const rcategory = req.params.rcategory;

    try {

        const data = await Recipe.find({ rcategory: rcategory });
        res.status(200).json(data)

    }

    catch (error) {

        res.status(500).send('Error')
    }

}

// a single recipe from the category is showing 

const recipe = async (req, res) => {

    const { recipeId } = req.params
    try {
        const recipe = await Recipe.findById(recipeId)
        res.status(200).json(recipe)

    }

    catch (error) {

        res.status(500).send('Error')
    }

}


// Delete a recipe by ID


const remove = async (req, res) => {
    try {
        const recipeId = req.params.id;
        await Recipe.findByIdAndDelete(recipeId);
        res.status(200).send({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting recipe', error });
    }
};



//User information 

const user = async (req, res) => {
    const body = req.body;

    try {

        const contactInfo = new Contact({

            name: body.name,
            email: body.email,
            querry: body.querry

        })
        await contactInfo.save()

        res.json({ status: "OK" })

    }

    catch (error) {
        console.error('Error saving form data', error);
        res.status(500).send('Error saving form data');
    }

}

// SignUP

const signup = async (req, res) => {

    const { name, email, password, phone } = req.body;

    try {
        const details = new Signup({

            name: name,
            email: email,
            password: password,
            phone: phone


        })

        await details.save();
        res.status(200).json({ Status: 'success' })

    }
    catch (err) {

        console.log(err)
    }

}


//Login

// const login = async(req,res) => {

//     try {
// const {password, email} = req.body;

// const user = await Signup.findOne({email,password})

// if(!user){
 
//     res.status(400).send('Invalid password and email provided')
    
// }
 
// const token = setUser(user);
//         res.cookie('uid', token); // Add secure: true in production with HTTPS , { httpOnly: true, secure: false }
//        res.status(200).json({ status: 'success'});

// }
// catch(err){
//     console.log(err)
// }


// }

const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await Signup.findOne({ email, password });

        if (!user) {
            return res.status(400).send('Invalid password and email provided');
        }

        const token = setUser(user);
        // res.cookie('uid', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('uid', token,{ httpOnly: true, secure: false,sameSite: 'LAX' });

         return res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Internal server error');
    }
};


module.exports = { addRecipe, remove, allrecipes, user, recipe, signup, login  }
