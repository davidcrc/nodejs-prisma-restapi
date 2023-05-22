import { prismaConn } from "../prismaConnection";

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

export const CategoryModel = {
  getCategoryById,
  getCategories,
};
