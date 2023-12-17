import express from 'express';
import users from './data/Users.js';
import products from './data/Products.js';
import Product from './models/ProductModel.js';
import User from './models/UserModel.js';
import asyncHandler from 'express-async-handler';

const ImportData = express.Router();

ImportData.post("/users", asyncHandler(
    async (req, res) => {
        await User.deleteMany({});
        const importUsers = await User.insertMany(users);
        res.send({ importUsers });
    }
));

ImportData.post("/products", asyncHandler(
    async (req, res) => {
        await Product.deleteMany({});
        const importProducts = await Product.insertMany(products);
        res.send({ importProducts });
    }
));


export default ImportData;