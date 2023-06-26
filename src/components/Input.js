import React, { useState } from "react";

const Input = (props) => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      setText("");
      props.onSendMessage(text);
    }
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
