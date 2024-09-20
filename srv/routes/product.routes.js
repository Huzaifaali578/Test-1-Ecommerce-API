import express from "express";
import ProductController from "../controllers/.product.controller.js";
const productController = new ProductController;

const productRouter = express.Router();

productRouter.post('/create', productController.createProduct);
productRouter.get('/', productController.getAllProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.post('/:id/update_quantity', productController.updateProductQuantity);

export default productRouter;