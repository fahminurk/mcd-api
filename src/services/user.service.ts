import { prisma } from "../app";
import { User, Register } from "../interfaces";

export const getAll = () => prisma.user.findMany();

export const getByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const getById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const create = (values: Register) =>
  prisma.user.create({ data: values });

export const deleteById = (id: string) => prisma.user.delete({ where: { id } });

export const updateById = (id: string, values: User) =>
  prisma.user.update({
    where: { id },
    data: values,
  });
