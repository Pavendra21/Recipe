const  {getUser} = require ('../Service/jwt');

const authMiddelware = (req, res,next) => {
    console.log('Cookies:', req.cookies.uid); 

    const token = req.cookies.uid;
    if(token) {

const user = getUser(token);
if(user){
req.user = user;
return next();

}

    }

res.redirect('/login');

}

module.exports = authMiddelware ;
