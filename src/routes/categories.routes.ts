import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

// add endpoints
router.get("/category/:id", CategoryController.getCategory);

router.get("/categories", CategoryController.getCategories);

export default router;
