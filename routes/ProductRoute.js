import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../models/ProductModel.js';
import protect from './../middleware/AuthMiddleware.js';

const productRoute = express.Router();

// GET ALL PRODUCTS
productRoute.get("/", asyncHandler(
    async (req, res) => {
        // 2 field regex
        // based on title and category field
        const keyword = req.query.keyword ? {
            $or: [{
                title: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }, {
                category: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }]
        }
            : {}
        const products = await Product.find({ ...keyword });
        res.json(products);
    }
));

// GET SINGLE PRODUCT
productRoute.get("/:id", asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product Not Found");
        }

    }
));

// PRODUCT REVIEW
productRoute.post("/:id/review", protect, asyncHandler(
    async (req, res) => {
        const { rating, comment, title } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReview = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )
            if (alreadyReview) {
                res.status(400)
                throw new Error("Product already Reviewed");
            }
            const review = {
                name: req.user.name,
                title,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review Added" });

        } else {
            res.status(404);
            throw new Error("Product Not Found");
        }

    }
));

export default productRoute;