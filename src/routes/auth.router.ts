import express from "express";
import { getToken, login, register } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/authorization";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/token", isAuthenticated, getToken);
};
