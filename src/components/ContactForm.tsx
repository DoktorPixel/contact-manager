import React, { useState } from "react";
import { useCreateContact } from "../hooks/useContacts";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: createContact } = useCreateContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName || lastName) {
      createContact({
        "first name": [{ value: firstName, label: "first name" }],
        "last name": [{ value: lastName, label: "last name" }],
        email: [{ value: email, label: "email" }],
        record_type: "person",
        privacy: { edit: null, read: null },
        owner_id: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;
