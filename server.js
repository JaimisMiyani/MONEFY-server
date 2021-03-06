const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

// Import Routes
const authRoute = require('./routes/auth');
const budgetsRoute = require('./routes/budgets');
const expensesRoute = require('./routes/expenses');
const profileRoute = require('./routes/profile')

dotenv.config();

const app = express();



//connect to db
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
        console.log('Conected to db!');
    })

// Middleware
app.use(cors())
app.use(express.json());


// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/budgets', budgetsRoute);
app.use('/api/expenses', expensesRoute);
app.use('/api/profile', profileRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
})