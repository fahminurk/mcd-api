import { Request, Response } from "express";
import fs from "fs";
import {
  create,
  deleteById,
  getAll,
  getById,
} from "../services/product.service";
import path from "path";
import { getById as getCategoryId } from "../services/category.service";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await getAll();
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const filename = req.file?.filename;
  try {
    let { name, description, price } = req.body;
    price = Number(price);
    const { id } = req.params;

    const category = await getCategoryId(id);
    console.log(category);

    if (!category) {
      return res.status(400).send({ message: "category not found" });
    }

    const product = await create({
      name,
      description,
      price,
      categoryId: id,
      imgUrl: "product/" + filename,
    });

    return res.status(200).send({ message: "products created", product });
  } catch (error) {
    console.log(error);
    try {
      fs.unlinkSync(path.join(__dirname, `../public/product/${filename}`));
    } catch (err) {
      console.log(err);
    }
    return res.status(500).send({ message: "server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const category = await getCategoryId(req.params.id);

    if (!category) {
      return res.status(400).send({ message: "category not found" });
    }

    const product = await getById(req.body.id);

    if (!product) {
      return res.status(400).send({ message: "product not found" });
    }

    await deleteById(req.body.id);

    if (product.imgUrl) {
      const img = category.imgUrl.split("/")[1];
      try {
        fs.unlinkSync(path.join(__dirname, `../public/product/${img}`));
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(200).send({ message: "product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
