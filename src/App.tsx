import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactDetails from "./components/common/ContactDetails";
import { Homepage } from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
