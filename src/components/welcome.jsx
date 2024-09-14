import React from "react";
import "../App.css";
const Welcome = ({setPage}) => {
  return (
    <div className="welcomeScreen">
      <h1>Welcome dear customer</h1>
      <button onClick={() => {setPage("survey")}}>Start survey</button> 
    </div>
  );
};

export default Welcome;
