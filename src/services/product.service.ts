import { prisma } from "../app";

export const getAll = () =>
  prisma.product.findMany({ include: { category: true } });

export const getById = (id: string) =>
  prisma.product.findUnique({ where: { id } });

export const deleteById = (id: string) =>
  prisma.product.delete({ where: { id } });

export const create = (values: any) =>
  prisma.product.create({
    data: values,
  });
