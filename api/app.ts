import express from "express";
import bodyParser from "body-parser";

import { simulateGame } from "../../monty-hall/src/Game";

const cors = require("cors");
export const app = express();

const PORT = 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", function(req, res) {
  let simulations = req.body.simulations;
  let switchDoor = req.body.switchDoor;

  const results = simulateGame(simulations, switchDoor);
  res.send(results + "");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
