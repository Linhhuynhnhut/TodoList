import React, { useState } from "react";
import "./form.scss";
const Form = ({ addTask }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      addTask(text);
      setText("");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        className="form_input"
        placeholder="What is the task today?"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type="submit" className="form_btn" onClick={() => {}}>
        Add Task
      </button>
    </form>
  );
};

export default Form;
