import express from "express";
import { getUsers } from "../services/user.service";

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
