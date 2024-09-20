import "./env.js"
import express from "express";
import productRouter from "./Beckend/routes/product.routes.js";
import path from "path";

const app = express()

// Serve static files from the frontend directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./frontend")))

// Route to serve the homepage (static index.html)
app.get('/', (req, res) => {
    console.log("Sending index.html file");
    res.sendFile(path.join(__dirname, './frontend/index.html'))
})

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
