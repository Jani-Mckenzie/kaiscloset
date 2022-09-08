/**
 * Main application file
 */

//setup middleware

const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Routers
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const globalErrorHandler = require("./controllers/errorcontroller");

//MIDDLEWARES



app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const adminsRouter = require("./routes/adminsRotuer");

// Start Express App
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((err) => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);
app.get("/", (req, res) => {
  res.send("Request Received");
});
app.use(globalErrorHandler);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
