  const mongoose = require('mongoose');

const signup = new mongoose.Schema ({

name:{type:'String',required:true},
email:{type:'String',required:true, unique:true},
password:{type:'String',required:true, trim:true, minlength:4},
phone:{type:'Number',required:true, trim:true, minlength:10, maxlength:10}

},{collection: "SignupDetails" })

const Signup = mongoose.model('signupDetails', signup)

module.exports = Signup;
