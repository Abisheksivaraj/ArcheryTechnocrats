import { Route, Routes } from "react-router-dom";
import React from "react";


import Form from "./Components/Form";
import Admin from "./Components/Admin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Form />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
