// Import the Mongoose library
const mongoose = require("mongoose");

// Set the "strictQuery" option to true to enforce strict mode for queries
mongoose.set("strictQuery", true);

// Connect to the MongoDB database using the environment variable MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Error connecting to database", err));
