// server/controllers/paymentController.js
const Razorpay = require("razorpay");
require("dotenv").config();

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Order creation failed");

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createOrder };
