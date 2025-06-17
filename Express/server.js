let express = require("express");
let mongoose = require("mongoose");
let expressLayouts = require("express-ejs-layouts");
let server = express()


server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.urlencoded());


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


server.get("/login.html", (req, res) => {
  return res.status(404).send("File Not Found");
  res.render("homepage");
});
server.use("/", require("./controllers/admin/admin.products.controller"));

server.get("/categories", (req, res) => {
  res.render("categories");
});
server.get("/", async (req, res) => {
  //   res.send("Hello AI Classs");
  let Product = require("./models/product.model");
  let products = await Product.find();
  // return res.send(products);
  res.render("homepage", { products });
});


mongoose.connect("mongodb://localhost:27017/DB").then(() => {
  console.log("connected to db");
});

server.listen(4000, () => {
  console.log("Server Started at localhost:4000");
});



