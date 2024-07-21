import connectionPool from "../configs/db.mjs";

const { data: paymentData } = await supabase.from("payment").insert([
  {
    payment_id: paymentIntent.id,
    user_id: req.body.user_id,
    card_number: card.card_number,
    card_name: card.card_name,
    expired_date: card.expired_date,
    created_at: new Date(),
    updated_at: new Date(),
  },
]);
