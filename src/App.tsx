import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [simulations, setSimulations] = useState("");
  const [switchDoor, setSwitchDoor] = useState(false);

  const handleSimulationsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSimulations(event.target.value);
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchDoor(event.target.checked);
  };

  const handleRunSimulatins = async (
    simulations: string,
    switchDoor: boolean
  ) => {
    const sendParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        simulations: parseFloat(simulations),
        switchDoor
      })
    };

    const response = await fetch("http://localhost:8000", sendParams);
    const json = await response.json();
    return json;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await handleRunSimulatins(simulations, switchDoor);
    console.log(result);
    setApiResponse(result);
  };

  console.log(simulations, switchDoor);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>
            how many times?
            <input
              type="number"
              value={simulations}
              onChange={handleSimulationsChange}
            />
          </label>
          <label>
            switch the door?
            <input
              type="checkbox"
              checked={switchDoor}
              onChange={handleSwitchChange}
            />
          </label>
          <button onClick={handleSubmit}>Run simulation</button>
        </form>
        <div>results: {apiResponse}</div>
      </header>
    </div>
  );
}

export default App;
