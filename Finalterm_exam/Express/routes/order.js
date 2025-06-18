const express = require('express');
const Order = require('../models/order');
const {isAuthenticated} = require('../routes/auth');
const router = express.Router();

router.get("/my_orders", isAuthenticated,async (req, res) => {


  try {
    const orders = await Order.find({ userId: req.session.user._id });
    res.render("my_orders", { orders });
  } catch (err) {
    res.send("Error loading orders: " + err.message);
  }
});

module.exports = router;
