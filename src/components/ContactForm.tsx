import React, { useState } from "react";
import { useCreateContact } from "../hooks/useContacts";
import { Button, TextField } from "@mui/material";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: createContact } = useCreateContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName || lastName) {
      createContact({
        fields: {
          "first name": [{ value: firstName, label: "first name" }],
          "last name": [{ value: lastName, label: "last name" }],
          email: [{ value: email, label: "email" }],
        },

        record_type: "person",
        privacy: { edit: null, read: null },
        owner_id: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Create Contact</h1>
      <TextField
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create Contact
      </Button>
    </form>
  );
};

export default ContactForm;
