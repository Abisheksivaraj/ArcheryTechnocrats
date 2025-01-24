const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json()); // Correctly invoked
app.use(cors());

// Routes
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome" });
});

const formRoute = require("./Routes/FormRoute");

app.use(formRoute);

module.exports = app;
