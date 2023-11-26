import express from "express";
import { getAllUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authorization";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUser);
};
