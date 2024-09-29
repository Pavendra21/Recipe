 const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const validator = require('validator'); // For email validation

const signupSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      validate: {
        validator: (v) => validator.isEmail(v),
        message: props => `${props.value} is not a valid email!`
      }
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'], 
      trim: true, 
      minlength: [4, 'Password must be at least 4 characters long'] 
    },
    phone: { 
      type: String, // Store phone as string to avoid issues with leading 0s
      required: [true, 'Phone number is required'], 
      trim: true, 
      minlength: [10, 'Phone number must be exactly 10 digits'], 
      maxlength: [10, 'Phone number must be exactly 10 digits'] 
    }
  },
  { collection: "SignupDetails" }
);

// Pre-save middleware to hash password before saving to the database
signupSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      user.password = await bcrypt.hash(user.password, salt); // Hash the password
    } catch (err) {
      return next(err);
    }
  }

  next();
});

// Method to compare entered password with hashed password
signupSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Signup = mongoose.model('signupDetails', signupSchema);

module.exports = Signup;
