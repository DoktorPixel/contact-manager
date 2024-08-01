import React from "react";
import { Link } from "react-router-dom";
import { useDeleteContact } from "../hooks/useContacts";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";

interface ContactCardProps {
  contact: {
    id: string;
    avatar_url: string;
    first_name: string;
    last_name: string;
    email: string;
    tags: [any];
  };
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { mutate: deleteContact } = useDeleteContact();

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <Avatar
        src={contact.avatar_url}
        alt={`${contact.first_name} ${contact.last_name}`}
        sx={{ width: 64, height: 64, m: 2 }}
      />
      <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
      <p>{contact?.email}</p>
      <div>
        {contact.tags?.map((tag, index) => (
          <span key={index} style={{ marginRight: "5px" }}>
            {tag.tag}
          </span>
        ))}
      </div>
      <Link to={`/contact/${contact.id}`}>View Details</Link>
      <button onClick={handleDelete}>Delete</button>
    </Card>
  );
};

export default ContactCard;
