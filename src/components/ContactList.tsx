import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactCard from "./ContactCard";

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useContacts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contacts</div>;
  if (!data || !data.contacts) return <div>No contacts available</div>;

  return (
    <div>
      {data.contacts.map((contact: any) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
