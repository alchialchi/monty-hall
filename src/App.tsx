import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { simulateGame } from "./Game";

function App() {
  const [apiResponse, setApiResponse] = useState(null);

  const callAPI = async () => {
    const response = await fetch("http://localhost:8000");
    const getAnswer = await response.json();
    setApiResponse(getAnswer);
  };

  useEffect(() => {
    callAPI();
  }, []);

  console.log("game", simulateGame(100, true));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{apiResponse}</div>
      </header>
    </div>
  );
}

export default App;
