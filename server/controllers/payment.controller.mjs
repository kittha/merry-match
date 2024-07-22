import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";
import { supabase } from "../utils/supabaseClient.mjs";

// Ensure you have a valid Stripe secret key in your environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const { user, product, cardDetail } = req.body;

  try {
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
    });

    const packageDetails = await getPackageById(product.package_id);
    console.log("Package Details:", packageDetails);

    const amountInTHB = parseInt(packageDetails.price, 10);

    if (!packageDetails || isNaN(amountInTHB)) {
      return res.status(400).json({
        success: false,
        message: "Product details are missing or invalid.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInTHB * 100, // Amount in THB (convert to cents)
      currency: "thb",
      customer: customer.id,
      payment_method: cardDetail.id,
      confirm: true,
      description: `Payment for ${packageDetails.name}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Payment Intent:", paymentIntent);

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing error",
    });
  }
};
