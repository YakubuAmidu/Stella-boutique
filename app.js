const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
require('dotenv/config');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'));
// app.use(authJwt());
app.use(errorHandler);

const PORT = 3000;

const api = process.env.API;

// routes
const categoriesRoutes = require('./routes/categories');
const ordersRoute = require('./routes/orders');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/users`, usersRoute);

// Databse connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})