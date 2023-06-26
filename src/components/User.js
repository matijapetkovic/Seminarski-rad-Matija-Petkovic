import React, { useState } from "react";

const User = ({ username, color, onUsernameChange, onColorChange }) => {
  const [name, chosenName] = useState(username);
  const [userPopupDisplay, setuserPopupDisplay] = useState(true);

  const handleUsernameChange = (e) => {
    const newName = e.target.value;
    if (newName.trim()) {
      chosenName(newName);
      onUsernameChange(newName);
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    onColorChange(newColor);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onUsernameChange(name);
      onColorChange(color);
      setuserPopupDisplay(false);
    }
  };

  return (
    <div className={`UserPopup ${userPopupDisplay ? "" : "hidden"}`}>
      <form className="UserPopupF" onSubmit={onSubmit}>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Type your name here..."
          value={name}
          onChange={handleUsernameChange}
          autoFocus={true}
        />
        <p>Choose your color</p>
        <input type="color" value={color} onChange={handleColorChange} />
        <button>Save</button>
      </form>
    </div>
  );
};

export default User;
