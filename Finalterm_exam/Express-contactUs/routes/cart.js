const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const Order = require("../models/order");
const {isAuthenticated} = require('../routes/auth');

// Ensure cart session exists
function initCart(req) {
  if (!req.session.cart) req.session.cart = [];
}

// Add to cart
router.post("/add/:id", async (req, res) => {
  initCart(req);
  const product = await Product.findById(req.params.id);
  const existingItem = req.session.cart.find((item) => item.id == product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    req.session.cart.push({
      id: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }
  res.redirect("/cart");
});

// View cart
router.get("/", (req, res) => {
  initCart(req);
  const cart = req.session.cart;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render("cart", { cart, total });
});

// Update quantity
router.post("/update/:id", (req, res) => {
  const { quantity } = req.body;
  const item = req.session.cart.find((i) => i.id == req.params.id);
  if (item) item.quantity = parseInt(quantity);
  res.redirect("/cart");
});

// Remove item
router.post("/remove/:id", (req, res) => {
  req.session.cart = req.session.cart.filter((i) => i.id != req.params.id);
  res.redirect("/cart");
});

// Checkout form
router.get("/checkout",isAuthenticated, (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render("checkout", { cart, total });
});

// Place Order
router.post("/checkout", async (req, res) => {
  console.log("🛒 /checkout called");
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

   console.log("User is logged in:", req.session.user);
  const { name, phone, address } = req.body;
  const cart = req.session.cart;
  console.log("Cart content:", cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("Total price:", total);
  const order = new Order({
    userId: req.session.user._id, // This links the order to the logged-in user
    name,
    phone,
    address,
    items: cart,
    total,
    status: "Pending",
  });

  try {
    await order.save();
    req.session.cart = []; // Clear the cart
    console.log("Cart cleared");
    res.render("success", { message: "Order placed successfully!" }); // Show order confirmation
  } catch (err) {
    console.error("Order saving failed:", err);
    res.status(500).send("Something went wrong while placing the order.");
  }
});

module.exports = router;
