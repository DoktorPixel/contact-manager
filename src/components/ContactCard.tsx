import React from "react";
import { Link } from "react-router-dom";
import { useDeleteContact } from "../hooks/useContacts";

interface ContactCardProps {
  contact: any;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { mutate: deleteContact } = useDeleteContact();

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <div>
      <img
        src={contact.avatar}
        alt={`${contact.first_name} ${contact.last_name}`}
      />
      <h3>{`${contact.first_name} ${contact.last_name}`}</h3>
      <p>{contact.email}</p>
      <div>
        {contact.tags.map((tag: any) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </div>
      <Link to={`/contact/${contact.id}`}>View Details</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ContactCard;
