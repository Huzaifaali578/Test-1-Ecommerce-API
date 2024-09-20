import Product from '../models/.product.model.js';
// import { createCounter } from "../config/config.js"

export default class ProductController {

    // API to add products to the database
    async createProduct(req, res) {
        try {
            const { name, quantity } = req.body;
            const product = new Product({ name, quantity });
            await product.save();
            res.status(201).json({
                data: { product }
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to add product' });
        }
    };

    // API to Get all products
    async getAllProduct(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json({
                data: { products }
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve products' });
        }
    };

    // API to delete a product by id
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await Product.findByIdAndDelete(id);
            res.status(200).json({
                data: { message: 'Product deleted' }
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    };

    // API to update quantity of a product
    async updateProductQuantity(req, res) {
        try {
            const { id } = req.params;
            const { number } = req.query;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            product.quantity += parseInt(number);
            await product.save();
            res.status(200).json({
                data: { product, message: 'Updated successfully' }
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update product quantity' });
        }
    };
    
}