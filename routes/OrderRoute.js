import asyncHandler from 'express-async-handler';
import express from 'express';
import Order from './../models/OrderModel.js';

const orderRoute = express.Router();

// CREATE ORDER
orderRoute.post("/", asyncHandler(
    async (req, res) => {
        const {
            user,
            orderItems,
            shippingAddress,
            totalPrice,
            paymentIntent,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
        } else {
            const order = new Order({
                user,
                orderItems,
                shippingAddress,
                totalPrice,
                paymentIntent,
            });

            const createOrder = await order.save()
            res.status(201).json(createOrder);
        }
    }
));

// GET USER LOGIN ORDER
orderRoute.get("/", asyncHandler(
    async (req, res) => {
        const order = await Order.find({});
        res.json(order);
    }
));


// GET ORDER BY ID
orderRoute.get("/:id", asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order not found");
        }
    }
));




// // ORDER IS PAID
// orderRoute.put("/:id/pay", asyncHandler(
//     async (req, res) => {
//         const order = await Order.findById(req.params.id);
//         console.log(order);
//         console.log("order pay route is called");

//         if (order) {
//             order.isPaid = true;
//             order.paidAt = Date.now();
//             order.paymentResult = {
//                 id: req.body.id,
//                 status: req.body.status,
//                 update_time: req.body.update_time,
//                 email_address: req.body.email_address,
//             };

//             const updateOrder = await order.save();
//             res.json(updateOrder);

//         } else {
//             res.status(404);
//             throw new Error("Order not found, so payment failed");
//         }
//     }
// ));

export default orderRoute;