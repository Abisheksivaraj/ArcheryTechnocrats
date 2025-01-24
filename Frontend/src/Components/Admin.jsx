import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import the autoTable plugin
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logo from "../assets/companyLogo.jpg";

const Admin = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:2025/all");
        setFormDataList(response.data.formDataList); // Directly access the data
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);

  // Function to download data as PDF
  // Function to download data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Admin Form Data", 14, 20);

    const headers = [
      "Role",
      "Name",
      "Designation",
      "Company Name",
      "City",
      "Mobile",
      "Email",
      "Address",
      "State",
      "Country",
    ];

    const data = formDataList.map((data) => [
      data.role,
      data.name,
      data.designation,
      data.companyName,
      data.city,
      data.mobile,
      data.email,
      data.address.replace(/\n/g, " "), // Replace newlines with space for the address
      data.state,
      data.country,
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      columnStyles: {
        7: {
          // Address column (index 7)
          cellWidth: "auto", // Adjust width to fit the content
          align: "left", // Align left to prevent wrapping
        },
      },
    });

    doc.save("form-data.pdf");
  };

  // Function to download data as Excel
  const downloadExcel = () => {
    const dataWithSerial = formDataList.map((data, index) => ({
      serialNumber: index + 1, // Serial number
      ...data,
    }));

    const ws = XLSX.utils.json_to_sheet(dataWithSerial);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Form Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "form-data.xlsx");
  };

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = formDataList.slice(indexOfFirstRow, indexOfLastRow);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(formDataList.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-10 bg-[#2F363F]">
      <img src={logo} alt="" className="rounded-lg" />
      <div className="container mx-auto p-6">
        <div className="mb-6 text-center">
          {/* <h1 className="text-4xl font-bold text-gray-900">Admin Form Data</h1> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#3498DB] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Company Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  City
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Mobile
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  State
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Country
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {currentRows.map((data, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 text-sm">
                    {indexOfFirstRow + index + 1}
                  </td>{" "}
                  {/* Serial number */}
                  <td className="px-6 py-4 text-sm">{data.role}</td>
                  <td className="px-6 py-4 text-sm">{data.name}</td>
                  <td className="px-6 py-4 text-sm">{data.designation}</td>
                  <td className="px-6 py-4 text-sm">{data.companyName}</td>
                  <td className="px-6 py-4 text-sm">{data.city}</td>
                  <td className="px-6 py-4 text-sm">{data.mobile}</td>
                  <td className="px-6 py-4 text-sm">{data.email}</td>
                  <td className="px-6 py-4 text-sm" title={data.address}>
                    {data.address.length > 10
                      ? `${data.address.substring(0, 10)}...`
                      : data.address}
                  </td>
                  <td className="px-6 py-4 text-sm">{data.state}</td>
                  <td className="px-6 py-4 text-sm">{data.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between space-x-4 mt-6">
          <button
            onClick={prevPage}
            className="bg-[#fe6a80] text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="bg-[#fe6a80] text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
          >
            Next
          </button>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Download as PDF
          </button>
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Download as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
