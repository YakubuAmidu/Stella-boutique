const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('API running');
});

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`)
});