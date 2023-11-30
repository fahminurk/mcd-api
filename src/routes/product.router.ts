import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/product.controller";
import { fileUploader } from "../middlewares/multer";

export default (router: express.Router) => {
  router.get("/products", getAllProduct);

  router.post(
    "/products/new/:id",
    fileUploader({
      destinationFolder: "product",
      fileType: "image",
    }).single("product"),
    createProduct
  );

  router.delete("/categories/:id", deleteProduct);
};

//65669fd0d435fe43abec1ea7
