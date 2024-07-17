import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const { packageId, card } = req.body;

  try {
    const packageDetails = await getPackageById(packageId);

    const { name: productName, price: productPrice } = packageDetails;

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: card.payment_method,
      confirm: true,
      amount: productPrice,
      currency: "thb",
      payment_method_types: ["card"],
      description: productName,
    });

    res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(400).json({ error: error.message });
  }
};
