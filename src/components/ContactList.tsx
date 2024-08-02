import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { transformContactData } from "@/helpers/contactHelpers";

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useContacts();

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <CircularProgress />
      </Box>
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

  console.log("contacts", contacts);

  return (
    <Box sx={{ padding: 2 }}>
      <h1 className="contacts-list-header">Contacts</h1>
      {contacts.map((contact: any) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </Box>
  );
};

export default ContactList;
