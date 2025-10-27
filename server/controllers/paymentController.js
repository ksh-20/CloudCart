import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

export const createOrder = async (req, res) => {
  try {
    // Initialize Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Order details
    const options = {
      amount: req.body.amount * 100, // amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // Create order
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Order creation failed");

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
