const express = require("express");
const FormData = require("../Models/FormModals");
const route = express.Router();

route.post("/submit", async (req, res) => {
  try {
    const {
      role,
      name,
      designation,
      companyName,
      city,
      mobile,
      email,
      address,
      state,
      country,
    } = req.body;

    // Validate required fields
    if (
      !role ||
      !name ||
      !mobile ||
      !email ||
      !designation ||
      !companyName ||
      !city ||
      !address ||
      !state ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new instance of the FormData model with the form data
    const newFormData = new FormData({
      role,
      name,
      designation,
      companyName,
      city,
      mobile,
      email,
      address,
      state,
      country,
    });

    // Save the form data to the database
    await newFormData.save();

    // Respond with a success message
    res.status(201).json({
      message: "Form data submitted successfully",
      formData: newFormData,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({
      message: "An error occurred while submitting the form",
      error: error.message,
    });
  }
});

route.get("/all", async (req, res) => {
  try {
    const formDataList = await FormData.find();

    res.status(200).json({
      message: "Form data retrieved successfully",
      formDataList,
    });
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the form data",
      error: error.message,
    });
  }
});

module.exports = route;
