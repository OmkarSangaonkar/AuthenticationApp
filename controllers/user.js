// Import User model and bcrypt library
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Render the sign-in page
module.exports.renderSignIn = function (req, res) {
  if (req.isAuthenticated()) {
    //If user is already authenticated, redirect to home page
    return res.redirect("/home");
  }
  // Otherwise, render the sign-in page
  return res.render("sign_in", { title: "Sign In" });
};

module.exports.renderSignUp = function (req, res) {
  if (req.isAuthenticated()) {
    //If user is already authenticated, redirect to home page
    return res.redirect("/home");
  }
  // Otherwise, render the sign-up page
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

// Render the home page
module.exports.renderHome = function (req, res) {
  return res.render("home", { title: "Home Page", user: req.user });
};

// Render the reset password page
module.exports.renderResetPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Reset Password",
    user: req.user,
  });
};

// Async function to update user password
module.exports.updatePassword = async function (req, res) {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Compare current password with hashed password in database
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If current password does not match, redirect back to password reset page
    if (!passwordMatches) {
      console.log("current password entered is invalid, try again:");
      return res.redirect("back");
    }

    // Hash the new password
    const plaintextPassword = req.body.new_password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(plaintextPassword, saltRounds);

    // Update user's password and save changes
    user.password = hash;
    await user.save();

    console.log("Password updated");
    return res.redirect("/destroy-session"); // Redirect to sign-in page
  } catch (e) {
    console.log("Error in reseting password: ", e);
  }
};

//create account
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      //throw noty notification that password don't match and redirect to sign Up

      return res.redirect("back");
    }

    //check if user already exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exist");

      return res.redirect("back");
    }

    const plaintextPassword = req.body.password;
    const saltRounds = 10;

    const hash = await bcrypt.hash(plaintextPassword, saltRounds);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    // save the new user to the database
    const savedUser = await newUser.save();

    //throw Noty

    res.status(200);

    // if (process.env.NODE_ENV == "development") {
    //   console.log("New User created: ", savedUser);
    // }

    console.log("New User created: ", savedUser);

    return res.redirect("/");
  } catch (e) {
    console.log("Error in creating user: ", e);
    return res.redirect("back");
  }
};

//create session
module.exports.createSession = function (req, res) {
  return res.redirect("/home");
};

//destroy session
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out :", err);
    }

    console.log("logged out");
    return res.redirect("/");
  });
};
