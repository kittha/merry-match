import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";
import { createTransaction } from "../models/transaction.model.mjs"; // Import your insert function

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const { user, product, cardDetail } = req.body;
  console.log("Received data:", req.body);

  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
    });

    // Fetch package details
    const packageDetails = await getPackageById(product.package_id);
    console.log("Package Details:", packageDetails);

    // Ensure package details are valid
    if (!packageDetails || !packageDetails.price) {
      return res.status(400).json({
        success: false,
        message: "Product details are missing or invalid.",
      });
    }

    // Convert package price to amount in cents
    const amountInTHB = parseInt(packageDetails.price, 10) * 100;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInTHB, // Amount in cents
      currency: "thb",
      customer: customer.id,
      payment_method: cardDetail.id,
      confirm: true,
      description: `Payment for ${packageDetails.name}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Avoid redirects
      },
    });

    console.log("Payment Intent:", paymentIntent);

    // Insert transaction into the database
    await createTransaction({
      package_id: product.package_id,
      status: paymentIntent.status,
      created_at: new Date(paymentIntent.created * 1000), // Convert from seconds to milliseconds
      updated_at: new Date(paymentIntent.created * 1000),
      session_id: paymentIntent.client_secret,
      stripe_id: paymentIntent.id, // Insert Stripe ID here
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing error",
    });
  }
};
