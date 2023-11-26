import express from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interfaces/user";
export const isAuthenticated = async (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "tidak ada token" });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      try {
        if (err) {
          console.log(err);
          return res.status(401).send("token expired");
        }
      } catch (error) {
        console.log(error);
      }
      req.user = decoded as CustomRequest["user"];
    });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
