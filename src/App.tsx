import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactDetails from "./components/ContactDetails";
import { Homepage } from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
