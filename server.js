const express = require('express');
require('dotenv/config');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();
const api = process.env.API_URL;

//Middleware
app.use(morgan('tiny'));
app.use(express.json({ extended: false }));

//Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('API running');
});

//Define routes
app.use(`${api}/auth`, require('./routes/api/auth'));
app.use(`${api}/profile`, require('./routes/api/profile'));
app.use(`${api}/users`, require('./routes/api/users'));
app.use(`${api}/product`, require('./routes/products/product'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`);
    console.log(api);
});