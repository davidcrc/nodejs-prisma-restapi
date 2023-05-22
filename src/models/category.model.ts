import { prismaConn } from "../prismaConnection";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./types/categoryTypes";

const createCategory = async (data: CreateCategoryInput) => {
  return prismaConn.category.create({ data });
};

const getCategoryById = async (id: number) => {
  return prismaConn.category.findFirst({
    where: {
      id,
    },
  });
};

const getCategories = async () => {
  // TODO: maybe we can add a variable to receive
  // e.g: withProducts: true , then add products { select : { ... }}

  return prismaConn.category.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const updateCategoryById = async (id: number, data: UpdateCategoryInput) => {
  return prismaConn.category.update({ where: { id }, data });
};

const deleteCategory = async (id: number) => {
  return prismaConn.category.delete({
    where: { id },
  });
};

export const CategoryModel = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategoryById,
  deleteCategory,
};
