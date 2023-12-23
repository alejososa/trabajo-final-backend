import { Router } from "express";
import CartController from "../controllers/cartController.js"

const cartRouter= Router();

cartRouter.get("/", CartController.getCarts);
cartRouter.get("/:cartId", CartController.getCartById);
cartRouter.post("/", CartController.createCart);
cartRouter.post("/:cartId/products/:productId", CartController.addProductToCart);
//cartRouter.post(":cartId/purchase", CartController.purchaseProducts);
cartRouter.put("/:cartId/products/:productId", CartController.updateQuantity);
cartRouter.delete("/:cartId", CartController.clearCart);


export default cartRouter;