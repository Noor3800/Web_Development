const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const { isAdmin } = require("./auth");
const Order = require("../models/order");

//  Add Product Form
router.get("/add-product", isAdmin, (req, res) => {
  res.render("admin/add-product");
});

//  Add Product (POST)
router.post("/add-product", isAdmin, async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.create({ title, price, description, image });
  res.redirect("/admin/admin-products");
});

//  List Products

router.get('/admin-products', isAdmin, (req, res) => {
  Product.find()
    .then(products => {
      res.render('admin/admin-products', { products });
    })
    .catch(err => console.log(err));
});

//  Edit Product Form
router.get("/edit-product/:id", isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("admin/edit-product", { product });
});

//  Update Product
router.post("/edit-product/:id", isAdmin, async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, description, image });
  res.redirect("/admin/admin-products");
});

//  Delete Product
router.post("/delete-product/:id", isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/admin-products");
});


router.get("/", isAdmin, (req, res) => {
  res.render("admin/dashboard"); // or any EJS view you made
});

// View all orders (Admin only)
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");;
    res.render('admin/orders', { orders });
  } catch (err) {
    res.status(500).send('Error fetching orders');
  }
});


// (Optional) Mark as completed
router.post("/orders/:id/status", isAdmin, async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.redirect("/admin/orders");
});
router.get('/products', isAdmin, async (req, res) => {
  // fetch products from DB
  const products = await Product.find();
  res.render('admin/products', { products });
});

module.exports = router;
