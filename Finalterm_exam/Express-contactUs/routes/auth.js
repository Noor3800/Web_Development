const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

let users = []; // In production, use a database

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); //  USING the User model

    if (!user) {
      return res.render('register');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = {
        _id: user._id,
        email: user.email,
      }; // Store the user in session
      res.redirect("/");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashed });
  try {
    await User.create({ email:email, password: hashed}); // 👈 USING the User model
    res.redirect("/auth/login");
  } catch (err) {
    res.send("Error creating user: " + err.message);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.send("Error logging out");
    }
    res.redirect("/auth/login");
  });
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.email === 'admin@project.com') {
    next();
  } else {
    res.status(403).send("Access denied.");
  }
}


module.exports = {
  router,
  isAuthenticated,
  isAdmin
};
