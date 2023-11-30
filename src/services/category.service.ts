import { prisma } from "../app";

export const getAll = () =>
  prisma.category.findMany({ include: { products: true } });

export const getById = (id: string) =>
  prisma.category.findUnique({ where: { id }, include: { products: true } });

export const create = (values: { name: string; imgUrl: string }) =>
  prisma.category.create({
    data: values,
  });

export const deleteById = (id: string) =>
  prisma.category.delete({ where: { id } });
