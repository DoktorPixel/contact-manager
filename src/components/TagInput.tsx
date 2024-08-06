import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";

const TagInput: React.FC<{
  onAddTags: (newTags: string[]) => void;
  isTagsLoading: Boolean;
  isTagsError: Boolean;
}> = ({ onAddTags, isTagsLoading, isTagsError }) => {
  const [tagInput, setTagInput] = useState("");
  const handleAddTags = () => {
    if (tagInput.trim()) {
      const normalizedInput = tagInput.replace(/\s+/g, ",");
      const newTags = normalizedInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      onAddTags(newTags);
      setTagInput("");
    }
  };

  return (
    <div className="tag-input-wrapper">
      <TextField
        type="text"
        placeholder="Add new Tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <Button
        onClick={handleAddTags}
        variant="contained"
        color="primary"
        disabled={isTagsLoading === true}
      >
        {isTagsLoading ? <CircularProgress /> : "Add Tag "}
      </Button>

      {isTagsError && (
        <p className="error-message ">something went wrong, try again later</p>
      )}
    </div>
  );
};

export default TagInput;
