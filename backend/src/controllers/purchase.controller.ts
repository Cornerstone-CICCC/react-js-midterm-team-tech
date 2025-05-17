import Stripe from "stripe";
import { Request, Response } from "express";

const createCheckoutSession = async (
    request: Request<{}, {}, { price_id: string }>,
    response: Response
) => {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16" as any,
    });

    const FRONTEND_URL = process.env.FRONTEND_URL!;

    const { price_id } = request.body;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price_id,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${FRONTEND_URL}/service-list?isSuccess=true`,
        cancel_url: `${FRONTEND_URL}/service-list?isSuccess=false`,
    });

    response.status(200).json({ url: session.url });
};

export default {
    createCheckoutSession,
};
