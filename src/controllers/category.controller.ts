import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import {
  create,
  deleteById,
  getAll,
  getById,
} from "../services/category.service";
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await getAll();
    return res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await getById(req.params.id);

    if (!category) {
      return res.status(400).send({ message: "category not found" });
    }

    return res.status(200).send(category);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
export const createCategory = async (req: Request, res: Response) => {
  const filename = req.file?.filename;
  try {
    const { name } = req.body;
    const category = await create({ name, imgUrl: "category/" + filename });
    return res.status(200).send({ message: "category created", category });
  } catch (error) {
    console.log(error);
    try {
      fs.unlinkSync(path.join(__dirname, `../public/category/${filename}`));
    } catch (err) {
      console.log(err);
    }
    return res.status(500).send({ message: "server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await getById(req.params.id);

    if (!category) {
      return res.status(400).send({ message: "category not found" });
    }

    await deleteById(req.params.id);

    // todo: delete img product

    if (category?.imgUrl) {
      const img = category.imgUrl.split("/")[1];
      try {
        fs.unlinkSync(path.join(__dirname, `../public/category/${img}`));
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).send({ message: "category deleted" });
  } catch (error) {
    console.log(error);
  }
};
