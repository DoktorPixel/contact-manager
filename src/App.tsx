import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="main">
        <ContactForm />
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
