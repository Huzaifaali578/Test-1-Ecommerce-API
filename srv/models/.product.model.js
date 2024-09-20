import mongoose from "mongoose";

// Define the schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

// Create the model from the schema
const productModel = mongoose.model("Product", productSchema);
export default productModel;
