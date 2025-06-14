import express from "express";
import mongoose from "mongoose";
import MenProducts from "../../models/products.model";

const mongoURI_men_prod = "mongodb://localhost:27017/men-products";
const menProdConnection = mongoose.createConnection(mongoURI_men_prod);
const MenProducts = menProdConnection.model("Product", productSchema);

let controller = express.Router();

controller.get("/admin/men-products/add",async (req,res)=>{
    let products = await MenProducts.find();
    res.render("admin/men-products/add", {layout: false, products});
});

controller.post("/admin/men-products/add", async (req,res)=>{
    let data = req.body;

    let p = new MenProducts();
    p.image =  data.image;
    p.description = data.description;
    p.price = data.price;

    await p.save();
    res.redirect("/admin/men-products/add");
});

controller.delete('/admin/men-products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await MenProducts.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

controller.put('/admin/men-products/:id', async (req, res) => {
  try {
    const updatedProduct = await MenProducts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    res.send({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).send({ success: false, message: "Error updating product" });
  }
});

export default controller;



