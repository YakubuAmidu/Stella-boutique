const express = require('express');
require('dotenv/config');

const app = express();
const api = process.env.API_URL;

// Middleware
app.use(express.json());

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
})

app.listen(3000, function(){
    console.log('Sever running of port:3000');
    console.log(api);
});