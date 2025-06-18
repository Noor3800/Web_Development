const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// Homepage
router.get('/', (req, res) => {
  res.render('index'); 
});

// About Page
router.get('/about', (req, res) => {
  res.render('about'); 
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products }); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error loading products");
  }
});

module.exports = router;
