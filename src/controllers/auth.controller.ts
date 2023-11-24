import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../services/user.service";

export const register = async (req: express.Request, res: express.Response) => {
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
