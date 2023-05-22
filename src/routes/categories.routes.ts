import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

// add endpoints
router.post("/categorires", CategoryController.createCategory);

router.get("/category/:id", CategoryController.getCategory);

router.get("/categories", CategoryController.getCategories);

router.delete("/category/:id", CategoryController.deleteCategory);

router.put("/category/:id", CategoryController.updateCategory);

export default router;
