import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Sorry, we couldn`t find that page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        come back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
