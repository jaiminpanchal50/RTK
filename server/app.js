const express = require("express");
const stripe = require("stripe")(
  "sk_test_51PfatdBMEheqm87LBPDmsmawPnQ4kFHtz777DeXZbsLdf7AIfM6YPj5EbVWoL9zpSGvMEpjNE6OYEnwP4UnDEDqB00sZFqJMzi"
); //secret key for
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  console.log("Server is running on port 3000");
});

app.post("/api/checkout", async (req, res) => {
  const { product } = req.body;
  const line_items = product.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: 2,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:5173/sucess",
    cancel_url: "http://localhost:3000/cancle",
    customer_email: req.body.email,
  });

  res.json({ id: session.id });
});

app.listen(4000);
