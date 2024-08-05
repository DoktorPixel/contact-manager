import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateContact } from "../hooks/useContacts";
import { Button, CircularProgress, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("Must be a valid email").optional(),
  avatarUrl: yup.string().url("Must be a valid URL").optional(),
});

const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: createContact, isError, isLoading } = useCreateContact();

  const onSubmit = (data: any) => {
    const { firstName, lastName, email, avatarUrl } = data;

    if (!firstName && !lastName) {
      setError("firstName", { message: "First name or Last name is required" });
      setError("lastName", { message: "First name or Last name is required" });
      return;
    } else {
      clearErrors(["firstName", "lastName"]);
    }

    const fields: Record<string, { value: string; label: string }[]> = {};

    if (firstName) {
      fields["first name"] = [{ value: firstName, label: "first name" }];
    }

    if (lastName) {
      fields["last name"] = [{ value: lastName, label: "last name" }];
    }

    if (email) {
      fields["email"] = [{ value: email, label: "email" }];
    }

    const contactData: any = {
      fields,
      record_type: "person",
      privacy: { edit: null, read: null },
      owner_id: null,
    };

    if (avatarUrl) {
      contactData.avatar_url = avatarUrl;
    }

    createContact(contactData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>Create Contact</h1>

      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
            fullWidth
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="avatarUrl"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Avatar URL"
            error={!!errors.avatarUrl}
            helperText={errors.avatarUrl?.message}
            fullWidth
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isValid || isLoading}
      >
        {isLoading ? <CircularProgress /> : "Create Contact "}
      </Button>

      {isError && (
        <p className="error-message ">something went wrong, try again later</p>
      )}
    </form>
  );
};

export default ContactForm;
