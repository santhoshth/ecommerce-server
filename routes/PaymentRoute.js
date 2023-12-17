import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import express from 'express';

const stripe = new Stripe('sk_test_51KxVxUSGSdcNvrR94bxJqQR7HPqBQcjHwYHaG495qHadP6CGUJ5eU1nNqzvOFKXef3ytXvCYHkubvzmhayYhfvYh00n1vyaA1P');

const paymentRoute = express.Router();

paymentRoute.post('/create', asyncHandler(
    async (req, res) => {

        const total = req.query.total;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "inr",
        });

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
))

export default paymentRoute;