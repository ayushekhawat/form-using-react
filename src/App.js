// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./Components/form-component";
import DetailsPage from "./Components/DetailsPage";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
