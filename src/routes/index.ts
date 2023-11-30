import express from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import categoryRouter from "./category.router";
import productRouter from "./product.router";

const router = express.Router();

export default (): express.Router => {
  authRouter(router);
  userRouter(router);
  categoryRouter(router);
  productRouter(router);
  return router;
};
