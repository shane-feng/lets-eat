const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routes/users');
const foodRouter = require('./routes/foods');

const app = express();

app.use(cors());
app.use(express.json());

// mount user and food routes
app.use('/users', userRouter);
app.use('/foods', foodRouter);

module.exports = app;