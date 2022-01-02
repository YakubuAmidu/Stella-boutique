const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv/config');

const app = express();
const morgan = require('morgan');

const api = process.env.API_URL;

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Connect to database
connectDB();

app.get(`${api}/products`, function(req, res){
  const product = {
      "id": 1,
      "name": "Hair dresser",
      "image": "Some image",
  };

  res.send(product);
  console.log(product);
});

app.post(`${api}/products`, function(req, res){
    const newProduct = req.body;
    res.send(newProduct);
    console.log(newProduct);
});

app.listen(PORT, function(){
    console.log(`Sever started on port ${PORT}`);
    console.log(api);
});