import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import * as middlewares from "./middlewares";
import MessageResponse from "./interfaces/MessageResponse";
import mongoose from "mongoose";
import compression from "compression";

require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "welcome to mekdi API!",
  });
});

app.use("/", routes());
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err: Error) => {
  console.log(`MongoDB connection error: ${err}`);
});

export default app;
