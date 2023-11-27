import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authorization";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUser);
  router.delete("/users/:id", deleteUser);
  router.post("/users/new", createNewUser);
};
