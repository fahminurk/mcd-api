import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUser,
} from "../controllers/user.controller";
import { jwtDecoder } from "../middlewares/jwtDecoder";

export default (router: express.Router) => {
  router.get("/users", jwtDecoder, getAllUser);
  router.delete("/users/:id", jwtDecoder, deleteUser);
  router.post("/users/new", jwtDecoder, createNewUser);
};
