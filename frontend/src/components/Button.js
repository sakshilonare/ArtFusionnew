import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import './Button.css';

const Button = ({ onButtonClick }) => {
  const handleClick = () => {
    console.log("Button clicked");
    onButtonClick();
  };

  return (
    <div className="button" onClick={handleClick}>
      <AiFillPlusCircle />
      {/* <p>Upload Photo</p> */}
    </div>
  );
};

export default Button;