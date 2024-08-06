import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContact, useAddTagsToContact } from "../hooks/useContacts";
import TagInput from "./TagInput";
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { transformContactData } from "@/helpers/contactHelpers";

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useContact(id!);
  const {
    mutate: addTagsToContact,
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useAddTagsToContact();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(`/`);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
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
        <Typography>Error loading contact</Typography>
      </Box>
    );

  const contacts = transformContactData(data);
  const contact = contacts[0];

  const { avatar_url, first_name, last_name, email, tags } = contact;

  const handleAddTags = (newTags: string[]) => {
    if (!data) return;
    const existingTags = tags.map((tag) => tag.tag);
    const updatedTags = Array.from(new Set([...existingTags, ...newTags]));
    addTagsToContact({ id: id!, tags: updatedTags });
  };

  return (
    <div className="contact-details-wrapper">
      <div className="contact-details">
        <Avatar
          sx={{ width: 90, height: 90, m: 2 }}
          src={avatar_url}
          alt={`${first_name} ${last_name}`}
        />
        <div className="contact-info">
          <h3>{`${first_name} ${last_name}`}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="contact-details-tags">
        {tags?.map((tag: any) => (
          <span key={tag.id}>{tag.tag}</span>
        ))}
      </div>
      <TagInput
        onAddTags={handleAddTags}
        isTagsLoading={isTagsLoading}
        isTagsError={isTagsError}
      />
      <div className="come-back-button-wrapper">
        <Button
          variant="outlined"
          className="come-back-button"
          onClick={handleBackClick}
        >
          come back
        </Button>
      </div>
    </div>
  );
};

export default ContactDetails;
