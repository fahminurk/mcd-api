import { UserModel } from "../db/user";
import { User, Register } from "../interfaces/user";

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Register) => {
  new UserModel(values).save().then((user) => user.toObject());
};

export const deleteUserById = (id: string) => {
  UserModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: User) => {
  UserModel.findByIdAndUpdate(id, values);
};
