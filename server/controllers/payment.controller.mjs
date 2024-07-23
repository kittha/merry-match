import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";
import { createTransaction } from "../models/transaction.model.mjs"; // Import your insert function

// Ensure you have a valid Stripe secret key in your environment variables
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

    const amountInTHB = parseInt(packageDetails.price, 10);

    if (!packageDetails || isNaN(amountInTHB)) {
      return res.status(400).json({
        success: false,
        message: "Product details are missing or invalid.",
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInTHB * 100, // Amount in THB (convert to cents)
      currency: "thb",
      customer: customer.id,
      payment_method: cardDetail.id,
      confirm: true,
      description: `Payment for ${packageDetails.name}`,
      return_url: "http://localhost:5173/payment-success",
    });

    console.log("Payment Intent:", paymentIntent);

    // Generate a unique transaction_id

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
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing error",
    });
  }
};
export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!", paymentIntent);

      // Update transaction in the database
      await updateTransactionStatus(paymentIntent.id, "succeeded");
      break;
    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object;
      console.log("PaymentIntent failed!", paymentFailed);

      // Update transaction in the database
      await updateTransactionStatus(paymentFailed.id, "failed");
      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
