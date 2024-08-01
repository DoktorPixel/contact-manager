import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";
import { Box, CircularProgress, Typography } from "@mui/material";

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useContacts();

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
  if (!data || !data.resources)
    return <Typography>No contacts available</Typography>;
  const contacts = data.resources.map((item: any) => ({
    id: item.id,
    avatar_url: item.avatar_url,
    first_name: item.fields["first name"]?.[0]?.value || "",
    last_name: item.fields["last name"]?.[0]?.value || "",
    email: item.fields.email?.[0]?.value || "",
    tags: item.tags || [],
  }));
  console.log("contacts", contacts);
  return (
    <Box sx={{ padding: 2 }}>
      <h1>Contacts</h1>
      {contacts.map((contact: any) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </Box>
  );
};

export default ContactList;
