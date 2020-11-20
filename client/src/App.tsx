import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Button = styled.button`
  margin: 8px 0;
  box-shadow: 0px 2px 0px 0px #1b96c2;
  background-color: #61dafb;
  border-radius: 14px;
  border: 1px solid #208ea1;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #46a4b5;
  &:hover {
    background-color: #2aa0bd;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const Form = styled.div`
  margin-top: 32px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const InputSimulations = styled.input`
  margin: 8px 0;
  font-size: 16px;
  border-color: #61dafb;
  border-style: solid;
  border-radius: 7px;
  border-width: 2px;
  padding: 9px;
`;

const Checkbox = styled.input`
  width: 20px;
`;

const Alert = styled.p`
  color: red;
  text-transform: uppercase;
  font-size: 12px;
`;

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [simulations, setSimulations] = useState("1000");
  const [switchDoor, setSwitchDoor] = useState(false);
  const [serverStatus, setServerStatus] = useState("");

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

  const callAPI = () => {
    fetch("http://localhost:8000/status")
      .then(res => res.text())
      .then(res => setServerStatus(res));
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await handleRunSimulatins(simulations, switchDoor);
    setApiResponse(result);
  };

  return (
    <Container>
      <img
        src="https://media.giphy.com/media/l2Sq8I4EiPDN5fqj6/giphy.gif"
        alt="Monty Hall Show"
      />
      <Form onSubmit={handleSubmit}>
        <label>How many times?</label>
        <InputSimulations
          type="number"
          value={simulations}
          onChange={handleSimulationsChange}
        />
        <label>
          Switch the door?
          <Checkbox
            type="checkbox"
            checked={switchDoor}
            onChange={handleSwitchChange}
          />
        </label>
        <Button disabled={!simulations} onClick={handleSubmit}>
          Run simulation
        </Button>
      </Form>
      {apiResponse && serverStatus ? (
        <div>You won {apiResponse} times!</div>
      ) : null}
      {serverStatus ? null : (
        <Alert>
          Server is not running, run npm start in api folder and reload the page
        </Alert>
      )}
    </Container>
  );
}

export default App;
