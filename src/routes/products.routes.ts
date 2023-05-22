import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();

// add endpoints
router.post("/products", ProductController.createProduct);

router.get("/product/:id", ProductController.getProduct);

router.get("/products", ProductController.getProducts);

router.delete("/product/:id", ProductController.deleteProduct);

router.put("/product/:id", ProductController.updateProduct);

export default router;
