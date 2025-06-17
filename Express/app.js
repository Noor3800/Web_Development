let express= require("express")
let ejs_layouts= require("express-ejs-layouts")
let session= require("express-session")
let router1= require('./routes/index')
let{ router: authRoutes }= require('./routes/auth')
const bodyParser = require('body-parser'); 
const mongoose= require('mongoose')
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const adminRoutes = require("./routes/admin");



require('dotenv').config();

let app= express()
const port= process.env.port || 8000;

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true
}))
mongoose.connect('mongodb://127.0.0.1:27017/order_data');
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(ejs_layouts)
app.set('view engine','ejs')

app.use('/',router1);
app.use('/auth',authRoutes);
app.use('/cart', cartRoutes);
app.use('/', orderRoutes);
app.use("/admin", adminRoutes);



app.listen(8000)