const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv/config');

// Connect to database
connectDB();

const app = express();
const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes
const categoriesRoute = require('./routes/categories');
const ordersRoute = require('./routes/categories');
const productsRoute = require('./routes/product');
const usersRoute = require('./routes/users');

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/users`, usersRoute);

// Sever
app.listen(PORT, function(){
    console.log(`Sever started on port ${PORT}`);
    console.log(api);
});