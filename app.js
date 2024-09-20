import "./env.js"
import express from "express";
import productRouter from "./srv/routes/product.routes.js";

const app = express()


// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Route middleware
app.use('/products', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



export default app;
