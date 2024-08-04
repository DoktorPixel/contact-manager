import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const TagInput: React.FC<{ onAddTags: (newTags: string[]) => void }> = ({
  onAddTags,
}) => {
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
      <Button onClick={handleAddTags} variant="contained" color="primary">
        Add Tag
      </Button>
    </div>
  );
};

export default TagInput;
