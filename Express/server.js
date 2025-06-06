let express = require("express");
let mongoose = require("mongoose");
let expressLayouts = require("express-ejs-layouts");
let server = express()


server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));


server.get("/index.html", async (req, res) => {
  let Product = require("./models/product.model");
  let products = await Product.find();
  res.render("index", {products});
});

// server.get("/", (req, res) => {
//   res.render("index");
// });

server.get("/indexcv.html", (req, res) => {
  res.render("indexcv", {layout: false});
});

mongoose.connect("mongodb://localhost:27017/DB").then(() => {
  console.log("connected to db");
});

server.listen(4000, () => {
  console.log("Server Started at localhost:4000");
});



