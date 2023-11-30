import express from "express";
import { getToken, login, register } from "../controllers/auth.controller";
import { jwtDecoder } from "../middlewares/jwtDecoder";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/token", jwtDecoder, getToken);
};
