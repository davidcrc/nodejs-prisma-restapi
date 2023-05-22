import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { statusCodes } from "../utils/status-codes";
import { CreateCategoryRequest } from "../types/categoryTypes";

const createCategory = async (req: CreateCategoryRequest, res: Response) => {
  try {
    // TODO: update with UUID
    const { name } = req.body;

    // TODO: if needed validate data

    const category = await CategoryModel.createCategory({
      name,
    });

    return res.status(statusCodes.success.CREATED).json(category);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error create category" });
  }
};

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

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    const { name } = req.body;

    // TODO: if needed validate data

    const updatedProduct = await CategoryModel.updateCategoryById(categoryId, {
      name,
    });

    return res.status(statusCodes.success.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error when update category" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    const categoryDeleted = await CategoryModel.deleteCategory(categoryId);

    if (!categoryDeleted) {
      return res
        .status(statusCodes.clientErrors.NOT_FOUND)
        .json({ error: "Category not found" });
    }

    return res.status(statusCodes.success.OK).json(categoryDeleted);

    // TODO: check if just return success
    // return res.status(statusCodes.success.NO_CONTENT).end();
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error when remove category or not found" });
  }
};

export const CategoryController = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
