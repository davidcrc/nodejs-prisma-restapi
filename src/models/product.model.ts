import { prismaConn } from "../prismaConnection";
import { CreateProductInput, UpdateProductInput } from "./types/productTypes";

const createProduct = async (data: CreateProductInput) => {
  return prismaConn.product.create({ data });
};

const getProductById = async (id: number) => {
  return prismaConn.product.findFirst({
    where: {
      id,
    },
    // REVIEW: Add cateory
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const getProducts = async () => {
  return prismaConn.product.findMany();
};

const updateProductById = async (id: number, data: UpdateProductInput) => {
  return prismaConn.product.update({ where: { id }, data });
};

const deleteProduct = async (id: number) => {
  return prismaConn.product.delete({
    where: { id },
  });
};

export const ProductModel = {
  createProduct,
  getProductById,
  getProducts,
  updateProductById,
  deleteProduct,
};
