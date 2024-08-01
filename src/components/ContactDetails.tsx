import React from "react";
import { useParams } from "react-router-dom";
import { useContact } from "../hooks/useContacts";
import TagInput from "./TagInput";

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useContact(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contact</div>;

  const { avatar, first_name, last_name, email, tags } = data.contact;

  const handleAddTags = (newTags: string[]) => {
    // Logic to add new tags via API
  };

  return (
    <div>
      <img src={avatar} alt={`${first_name} ${last_name}`} />
      <h3>{`${first_name} ${last_name}`}</h3>
      <p>{email}</p>
      <div>
        {tags?.map((tag: any) => (
          <span key={tag.id}>{tag.tag}</span>
        ))}
      </div>
      <TagInput onAddTags={handleAddTags} />
    </div>
  );
};

export default ContactDetails;
