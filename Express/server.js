const mongoose = require('mongoose');
const Product = require('./models/Products');

mongoose.connect('mongodb://127.0.0.1:27017/order_data')
  .then(async () => {
    await Product.insertMany([
      {
        title: 'dress 1',
        price: 500,
        description: 'Comfortable cotton T-shirt',
        image: '/images/tshirt1.jpg'
      },
      {
        title: 'dress 2',
        price: 2000,
        description: 'cotton dress',
        image: '/images/men6.jpg'
      }
      ,
      {
        title: 'dress 3',
        price: 2000,
        description: 'comfortable dress',
        image: '/images/men3.jpg'
      },
      {
        title: 'dress 4',
        price: 2000,
        description: 'comfortable dress',
        image: '/images/tshirt4.jpg'
      }
    ]);
    console.log("Products added");
    process.exit();
  });

  