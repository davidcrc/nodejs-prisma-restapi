import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { statusCodes } from "../utils/status-codes";
import { CreateProductRequest } from "../types/productTypes";
import { handleErrors } from "../errors/HandleErrors";

const createProduct = async (req: CreateProductRequest, res: Response) => {
  try {
    // TODO: update with UUID
    const { name, price, stock, categoryId } = req.body;

    // TODO: if needed validate data

    const product = await ProductModel.createProduct({
      name,
      price,
      stock,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });

    return res.status(statusCodes.success.CREATED).json(product);
  } catch (error) {
    // TODO: check this for the others functions
    return handleErrors(res, error);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await ProductModel.getProductById(productId);

    if (!product) {
      return res
        .status(statusCodes.clientErrors.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    return res.status(statusCodes.success.OK).json(product);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error get category" });
  }
};

const getProducts = async (_req: Request, res: Response) => {
  try {
    const categories = await ProductModel.getProducts();

    return res.status(statusCodes.success.OK).json(categories);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error get products" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    const productDeleted = await ProductModel.deleteProduct(productId);

    if (!productDeleted) {
      return res
        .status(statusCodes.clientErrors.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    return res.status(statusCodes.success.OK).json(productDeleted);

    // TODO: check if just return success
    // return res.status(statusCodes.success.NO_CONTENT).end();
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error when remove product or not found" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    const { name, price, stock, categoryId } = req.body;

    // TODO: if needed validate data

    const updatedProduct = await ProductModel.updateProductById(productId, {
      name,
      price,
      stock,
      category: {
        update: {
          id: categoryId,
        },
      },
    });

    return res.status(statusCodes.success.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);

    return res
      .status(statusCodes.serverErrors.INTERNAL_SERVER_ERROR)
      .json({ error: "Error when update product" });
  }
};

export const ProductController = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
