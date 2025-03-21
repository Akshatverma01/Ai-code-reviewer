import express from "express";
import aiRoutes from "../src/routes/ai.routes.js";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors())

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/ai',aiRoutes)

export default app;
