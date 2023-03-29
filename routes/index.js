// Import the necessary libraries and modules like express, passport
const express = require("express");
const router = express.Router(); // Router object
const controller = require("../controllers/user"); // Router object
const passport = require("passport");

// Define the routes for the user-related functionality
router.get("/", controller.renderSignIn); // GET route for sign-in page
router.get("/sign-up", controller.renderSignUp); // GET route for sign-up page
router.post("/create", controller.create); // POST route to create a new user

// POST route to create a new session using passport-local strategy
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  controller.createSession
);
router.get("/home", controller.renderHome); // GET route for the user's home page

// GET route to destroy the user's session and log them out
router.get("/destroy-session", controller.destroySession);

// GET route for the reset password page
router.get("/reset-password", controller.renderResetPassword);

// POST route to update the user's password using passport-local strategy
router.post(
  "/update-password",
  passport.authenticate("local", { failureRedirect: "back" }),
  controller.updatePassword
);

// Define routes for Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//callback from google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  controller.createSession
);

module.exports = router;
