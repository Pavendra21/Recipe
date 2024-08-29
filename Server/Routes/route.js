const express = require('express');
const router = express.Router();
const authMiddelware = require('../Middleware/authmiddleware')

const {addRecipe, remove, allrecipes, user, recipe, signup, login} = require('../Controller/handle')



router.post("/login",login)
router.post("/signup",signup)
router.get("/allrecipes/:rcategory",allrecipes )
router.get("/allrecipes/:rcategory/:recipeId",recipe )
router.post("/contact", user)

// router.use(authMiddelware)

router.post("/recipe", addRecipe)
router.delete("/allrecipes/:id", remove )



module.exports =  router ;

