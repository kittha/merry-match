import Stripe from "stripe";
import { getPackageById } from "../models/package.model.mjs";
import { createTransaction } from "../models/transaction.model.mjs";
import {
  createPayment,
  getPaymentByUserId,
  updatePaymentByUserId,
} from "../models/payment.model.mjs";
import { updateUserPackage } from "../models/user.model.mjs";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define the getCardType function
const getCardType = (cardNumber) => {
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard:
      /^(?:5[1-5][0-9]{14}|2(?:2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/,
  };

  for (const [card, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return card;
    }
  }

  return "unknown";
};

// Define card mapping
const cardMapping = {
  visa: "pm_card_visa",
  visa_debit: "pm_card_visa_debit",
  mastercard: "pm_card_mastercard",
  mastercard_debit: "pm_card_mastercard_debit",
  visa_chargeDeclined: "pm_card_visa_chargeDeclined",
};

export const processPayment = async (req, res) => {
  const { user, product, cardDetail } = req.body;
  console.log("Received data:", req.body);

  try {
    const customer = await stripe.customers.create({
      name: user.name,
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

    // Determine the card type
    const cardNumber = cardDetail.card.replace(/\s+/g, ""); // Remove spaces
    const cardType = getCardType(cardNumber);
    console.log("Card Type:", cardType);

    // Map the card type to the predefined card
    const mappedCardType = cardMapping[cardType];
    if (!mappedCardType) {
      return res.status(400).json({
        success: false,
        message: "Unsupported card type.",
      });
    }

    // Create a payment intent using the predefined card type
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInTHB, // Amount in cents
      currency: "thb",
      customer: customer.id,
      payment_method: mappedCardType,
      confirm: true,
      description: `Payment for ${packageDetails.name}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Payment Intent:", paymentIntent);

    // Extract the last 4 digits of the card number
    const last4Digits = cardNumber.slice(-4);

    const existingPayment = await getPaymentByUserId(user.user_id);

    if (existingPayment) {
      // Update existing payment details
      await updatePaymentByUserId(user.user_id, {
        card_type: cardType,
        card_number: last4Digits,
        card_name: user.name,
        expired_date: cardDetail.exp,
        updated_at: new Date(paymentIntent.created * 1000), // Convert from seconds to milliseconds
      });
    } else {
      // Create new payment details
      await createPayment({
        user_id: user.user_id,
        card_type: cardType,
        card_number: last4Digits,
        card_name: user.name,
        expired_date: cardDetail.exp,
        created_at: new Date(paymentIntent.created * 1000), // Convert from seconds to milliseconds
        updated_at: new Date(paymentIntent.created * 1000),
      });
    }

    // Insert transaction into the database
    await createTransaction({
      package_id: product.package_id,
      user_id: user.user_id,
      status: paymentIntent.status,
      amount: packageDetails.price,
      currency: "thb",
      created_at: new Date(paymentIntent.created * 1000), // Convert from seconds to milliseconds
      updated_at: new Date(paymentIntent.created * 1000),
      session_id: paymentIntent.id,
    });

    await updateUserPackage(user.user_id, product.package_id);

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    console.error("Payment error:", error);

    // Handle specific Stripe errors
    if (error.type === "StripeCardError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.type === "StripeAPIError") {
      return res.status(500).json({
        success: false,
        message: "Payment processing error",
      });
    } else {
      // Generic error handling
      return res.status(500).json({
        success: false,
        message: "An error occurred during payment processing.",
      });
    }
  }
};
