import { UserModel } from "../db/user";
import { User, Register } from "../interfaces/user";

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Register) => {
  new UserModel(values).save().then((user) => user.toObject());
};

export const deleteUserById = async (id: string) => {
  await UserModel.findByIdAndDelete({ _id: id });
};

export const updateUserById = async (id: string, values: User) => {
  await UserModel.findByIdAndUpdate(id, values);
};
