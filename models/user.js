// Import Mongoose library
const mongoose = require("mongoose");

// Define user schema by adding name, email and password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model using the user schema
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other files
module.exports = User;
