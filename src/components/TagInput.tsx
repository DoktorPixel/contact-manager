import React, { useState } from "react";

const TagInput: React.FC<{ onAddTags: (tags: string[]) => void }> = ({
  onAddTags,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTags = () => {
    if (tagInput.trim()) {
      const tags = tagInput.split(",").map((tag) => tag.trim());
      onAddTags(tags);
      setTagInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add tags"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <button onClick={handleAddTags}>Add Tags</button>
    </div>
  );
};

export default TagInput;
