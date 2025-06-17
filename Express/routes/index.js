const express = require('express');
const session = require('express-session');
const router = express.Router();

const Product = require('../models/Products');

router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('products', { products }); 
});

// const productList = [
//     { name: "Dress 1", price: "$49", image: "/images/fb1.webp" },
//     { name: "Dress 2", price: "$59", image: "/images/fb2.webp" },
//     { name: "Dress 3", price: "$69", image: "/images/fb3.webp" },
//     { name: "Dress 4", price: "$59", image: "/images/fb4.webp" }

// ];
router.get('/', (req, res) => {
    res.render('index');
});

// router.get('/products', (req, res) => {
//     res.render('products', { products: productList});
// });

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;