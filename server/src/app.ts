import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
// import connectDB from "./config/db";
import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import "./tasks/lowStockNotificationCron";
import "./tasks/appointmentNotificationCron";
require("dotenv").config();

const app = express();
// const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "kentStack-api-express-vercel",
  });
});

app.use("/api/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
