import express from "express";
import dotenv from "dotenv";
import { dummyFunction } from "@falcon/dummy";

dotenv.config();

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});

app.all("/", (req, res, next) => {
  console.log("Received a request");
  next();
});

app.get("/", (req, res) => {
  const dummy = dummyFunction();
  res.send(`Hello from Draco! ${dummy}`);
});
