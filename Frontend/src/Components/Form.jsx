import React, { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import logo from "../assets/CompanyLogo.jpg";

const Form = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    designation: "",
    companyName: "",
    city: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    country: "",
  });

  const [qrCodeData, setQrCodeData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQrCodeData(JSON.stringify(formData));

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:2025/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", formData);

      if (response.status === 200) {
        setSuccessMessage(response.data.message); // Assuming the response contains a 'message'
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
      }

      // Trigger the print dialog
      triggerPrint();
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
      console.error("Error submitting form:", error);
    }
  };

  const triggerPrint = () => {
    const printContent = document.getElementById("print-view");
    const originalContent = document.body.innerHTML;

    // Replace the content of the body with the print content
    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="p-5 bg-[#2F363F]">
      <div className="bg-[#3498DB]">
        <img src={logo} alt="Company Logo" className="w-[full] p-10" />
      </div>

      <div className="w-full p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Visitor/Student Form</h2>
       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Are you Visitor/Student?</label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      >
        <option value="">Select</option>
        <option value="visitor">Visitor</option>
        <option value="student">Student</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Designation</label>
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Company Name</label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Mobile Number</label>
      <input
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Address</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">State</label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Country</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
  >
    Submit
  </button>
</form>


        {/* Print view */}
        <div className="hidden" id="print-view">
          <div
            style={{
              width: "100mm",
              height: "150mm",
              padding: "10mm",
              border: "1px solid #000",
              fontSize: "14px",
              gap: "10",
            }}
          >
            <img src={logo} alt="Company Logo" style={{ width: "100%" }} />
            <p className="text-center font-semibold text-xl">{formData.name}</p>
            <p className="text-center font-semibold text-l">
              {formData.companyName}
            </p>

            <div className="mt-4 flex items-center justify-center">
              <QRCode value={qrCodeData} size={150} />
            </div>
            <div className=" w-full p-3">
              <p className="text-center bg-[navy] p-3 text-white font-bold">
                {formData.role}
              </p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}

        {/* Print style */}
        <style>
          {`
          @media print {
            form, button {
              display: none;
            }
            #print-view {
              display: block;
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Form;
