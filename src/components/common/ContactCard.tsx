import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteContact } from "@/hooks/useContacts";
import { Avatar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CloseLogo } from "@/assets/Icons";

interface ContactCardProps {
  contact: {
    id: string;
    avatar_url: string;
    first_name: string;
    last_name: string;
    email: string;
    tags: Array<{ id: string; tag: string }>;
  };
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { mutate: deleteContact } = useDeleteContact();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteContact(contact.id);
    setOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/contact/${contact.id}`);
  };

  return (
    <div onClick={handleCardClick} className="contact-card">
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

      <button onClick={handleClickOpen}>
        <CloseLogo />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle id="alert-dialog-title">{"Delete Contact?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactCard;
