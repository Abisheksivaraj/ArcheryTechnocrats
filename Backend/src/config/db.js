const mongoose = require("mongoose");
require("dotenv").config();
let URI = process.env.URI;
console.log(URI);
const connectDb = () => {
  return mongoose.connect(URI);
};

module.exports = connectDb;
