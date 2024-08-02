import React, { useState } from "react";
import { useCreateContact } from "../hooks/useContacts";
import { Button, TextField } from "@mui/material";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: createContact } = useCreateContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName && !lastName) {
      setErrorMessage(
        "Please fill in at least one of the fields: 'First name' or 'Last name'"
      );
      return;
    }

    setErrorMessage("");

    const fields: Record<string, { value: string; label: string }[]> = {};

    if (firstName) {
      fields["first name"] = [{ value: firstName, label: "first name" }];
    }

    if (lastName) {
      fields["last name"] = [{ value: lastName, label: "last name" }];
    }

    if (email) {
      fields["email"] = [{ value: email, label: "email" }];
    }

    const contactData: any = {
      fields,
      record_type: "person",
      privacy: { edit: null, read: null },
      owner_id: null,
    };

    if (avatarUrl) {
      contactData.avatar_url = avatarUrl;
    }
    createContact(contactData);
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
      />
      <TextField
        type="text"
        placeholder="Avatars link"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Button type="submit" variant="contained" color="primary">
        Create Contact
      </Button>
    </form>
  );
};

export default ContactForm;
