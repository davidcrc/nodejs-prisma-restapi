import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { statusCodes } from "../utils/status-codes";

const getCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    const category = await CategoryModel.getCategoryById(categoryId);

    if (!category) {
      return res
        .status(statusCodes.clientErrors.NOT_FOUND)
        .json({ error: "Category not found" });
    }

    return res.status(statusCodes.success.OK).json(category);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error get category" });
  }
};

const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.getCategories();

    return res.status(statusCodes.success.OK).json(categories);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error get categories" });
  }
};

export const CategoryController = {
  getCategory,
  getCategories,
};
