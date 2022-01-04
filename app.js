const express = require('express');
const morgan = require('morgan');
require('dotenv/config');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'));

const PORT = 3000;

const api = process.env.API;

const categoriesRoutes = require('./routes/categories');
const ordersRoute = require('./routes/orders');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/users`, usersRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})