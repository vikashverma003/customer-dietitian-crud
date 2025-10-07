const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

//const cors = require("cors"); // cors is used to handle cross-origin requests.

const dotenv = require("dotenv");

// dotenv.config();
dotenv.config({ debug: true }); // Enabling the debug mode.
connectDB();

const PORT = process.env.PORT || 8003;

const app = express();

/* these two middleware functions allow your Express application to handle both JSON and form-encoded data from client requests.*/

app.use(express.json()); // is used for parsing JSON request bodies.
app.use(express.urlencoded({ extended: false })); // is used for parsing URL-encoded form data

// for the calling the routes only for the testing purpose and population related routes

/* Testing routes for the seperating the routes */

const customer = require("./routes/CustomerRoutes");
const advisor = require("./routes/AdvisorRoutes");
const dietitian = require("./routes/DietitianRoutes");
const review = require("./routes/ReviewRoute");

app.use("/api/customer", customer);
app.use("/api/dietitian", dietitian);
app.use("/api/advisor", advisor);
app.use("/api/review", review);

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
