import Stripe from "stripe";

import { supabase } from "../utils/supabaseClient.mjs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const { packageId, card } = req.body;

  try {
    const { data: packageDetails, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_id", packageId)
      .single();

    if (error || !packageDetails) {
      return res.status(404).json({ message: "Package not found" });
    }

    const { name: productName, price: productPrice } = packageDetails;

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: card.payment_method,
      confirm: true,
      amount: productPrice * 100,
      currency: "thb",
      payment_method_types: ["card"],
      description: productName,
    });

    const { data: paymentData, error: insertError } = await supabase
      .from("payments")
      .insert([
        {
          payment_id: paymentIntent.id,
          user_id: req.body.user_id,
          card_number: card.card_number,
          card_name: card.card_name,
          expired_date: card.expired_date,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    res.status(200).json({ paymentIntent, payment: paymentData });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(400).json({ error: error.message });
  }
};
