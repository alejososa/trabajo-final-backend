import { Router } from "express";
import ProductController from "../controllers/productController.js";
import {isAdmin} from "../middlewares/auth.middleware.js";

const productRouter= Router();

productRouter.get("/", ProductController.getProducts);
productRouter.get("/:productId", ProductController.getProductByid);
productRouter.post("/", isAdmin, ProductController.createProduct);
productRouter.put("/:productId", isAdmin, ProductController.updateProduct);
productRouter.delete("/:productId", isAdmin, ProductController.deleteProduct);

export default productRouter;

