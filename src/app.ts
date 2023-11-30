import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.get("/", (req, res) => {
  res.json({
    message: "welcome to mekdi API!",
  });
});

app.use("/", routes());
app.use("/category", express.static(path.join(__dirname, "public/category")));
app.use("/product", express.static(path.join(__dirname, "public/product")));

prisma
  .$connect()
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
