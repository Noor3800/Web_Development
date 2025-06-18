const express = require("express");
const ejs_layouts = require("express-ejs-layouts");
const session = require("express-session");
const router1 = require('./routes/index');
const { router: authRoutes } = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const adminRoutes = require("./routes/admin");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const complaint_routes= require('./routes/complaint');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.session.user || null;
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(ejs_layouts);

app.use('/', router1);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/complaints',complaint_routes)

mongoose.connect('mongodb://localhost:27017/DB')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Error:', err));

app.listen(3000, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
