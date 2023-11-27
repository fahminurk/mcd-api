import express from "express";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUsers,
} from "../services/user.service";
import bcrypt from "bcrypt";
export const getAllUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    console.log(id);

    const response = await deleteUserById(id);
    console.log(response);

    return res.status(200).send({ message: "user deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "fields required" });
    }

    const checkUser = await getUserByEmail(email);

    if (checkUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      password: hashedPassword,
      fullname,
    });

    return res.status(201).send({ user, message: "user created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
