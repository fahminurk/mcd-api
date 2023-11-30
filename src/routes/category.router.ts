import express from "express";
import {
  createCategory,
  deleteCategory,
  // createNewCategory,
  // deleteCategory,
  getAllCategory,
  getCategoryById,
} from "../controllers/category.controller";
import { fileUploader } from "../middlewares/multer";

export default (router: express.Router) => {
  router.get("/categories", getAllCategory);
  router.get("/categories/:id", getCategoryById);

  router.post(
    "/categories/new",
    fileUploader({
      destinationFolder: "category",
      fileType: "image",
    }).single("category"),
    createCategory
  );

  router.delete("/categories/:id", deleteCategory);
};
