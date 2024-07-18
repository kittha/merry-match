import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  console.log(req.body);

  const { packageId, card } = req.body;
  const success_url = `http://localhost:5173/payment/success`;
  const cancel_url = `http://localhost:5173`;

  try {
    const packageDetails = await getPackageById(packageId);

    if (!packageDetails) {
      throw new Error("Package not found");
    }

    let { name: productName, price: productPrice } = packageDetails;
    productPrice = Number(productPrice) * 100;

    // const paymentIntent = await stripe.paymentIntents.create({
    //   payment_method: card.payment_method,
    //   confirm: true,
    //   amount: productPrice,
    //   currency: "thb",
    //   payment_method_types: ["card"],
    //   description: productName,
    // });

    const paymentIntent = await stripe.paymentIntents.create({
      confirmation_method: "automatic",
      amount: productPrice,
      currency: "thb",
      payment_method_types: ["card"],
      description: productName,
    });

    // https://dashboard.stripe.com/test/payments

    res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(400).json({ error: error.message });
  }
};
