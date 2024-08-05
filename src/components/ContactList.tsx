import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { transformContactData } from "@/helpers/contactHelpers";

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useContacts();

  if (isLoading)
    return (
      <div className="loading-box">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Error loading contacts</Typography>
      </Box>
    );

  const contacts = transformContactData(data);
  if (contacts.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>No contacts available</Typography>
      </Box>
    );

  return (
    <div className="contacts-list">
      <Box>
        <h1 className="contacts-list-header">Contacts</h1>
        {contacts.map((contact: any) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </Box>
    </div>
  );
};

export default ContactList;
