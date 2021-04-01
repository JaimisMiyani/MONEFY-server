const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();

//connect to db

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Conected to db!');
    })

// Middleware

app.use(express.json());


// Route Middlewares
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
})