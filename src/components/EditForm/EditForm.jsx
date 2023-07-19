import React, { useState } from "react";
import "./editForm.scss";
const EditForm = ({ index, task, setTaskEditing, visible, updateTask }) => {
  // const [editedTask, setEditedTask] = useState(task);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask(index, task);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`editForm ${visible ? "visible" : ""}`}
    >
      <input
        type="text"
        value={task}
        className="editForm_input"
        placeholder="What is the task today?"
        onChange={(e) => {
          console.log("e value>>", e.target.value);
          setTaskEditing(e.target.value);
        }}
      />
      <button type="submit" className="editForm_btn">
        Update
      </button>
    </form>
  );
};

export default EditForm;
