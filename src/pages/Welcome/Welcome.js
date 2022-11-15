import React from 'react';
import { useNavigate } from "react-router-dom";
import './styles.scss';

const Welcome = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/todo-list");
  };

  return (
    <div className="welcome">
      <h1>Hello there!</h1>
      <p>Oops... once you start reading you can't stop, now your mission is to complete the TODO list, good luck!</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

export default Welcome;