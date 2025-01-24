const mongoose = require("mongoose");


const formDataSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } 
);


const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
