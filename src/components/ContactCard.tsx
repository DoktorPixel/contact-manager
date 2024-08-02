import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteContact } from "../hooks/useContacts";
import { Card, Avatar } from "@mui/material";
import { CloseLogo } from "@/assets/Icons";

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
  const navigate = useNavigate();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteContact(contact.id);
  };

  const handleCardClick = () => {
    navigate(`/contact/${contact.id}`);
  };

  return (
    <Card
      sx={{ display: "flex", mb: 2 }}
      onClick={handleCardClick}
      className="contact-card"
    >
      <div className="contact-card-wrapper">
        <Avatar
          src={contact.avatar_url}
          alt={`${contact.first_name} ${contact.last_name}`}
          sx={{ width: 60, height: 60, m: 2 }}
        />
        <div className="card-info-wrapper">
          <div className="card-info">
            <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
            <p>{contact.email}</p>
          </div>
          <div className="card-tags-wrapper">
            {contact.tags.map((tag, index) => (
              <span key={index} style={{ marginRight: "5px" }}>
                {tag.tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleDelete}>
        <CloseLogo />
      </button>
    </Card>
  );
};

export default ContactCard;
