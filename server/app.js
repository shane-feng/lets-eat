const express = require('express');
const cors = require('cors');
const { requestSizeLimit } = require('./config');
require('./db/mongoose');

const userRouter = require('./routes/users');
const foodRouter = require('./routes/foods');

const app = express();

app.use(cors());
app.use(express.json({ limit: requestSizeLimit }));

// mount user and food routes
app.use('/users', userRouter);
app.use('/foods', foodRouter);

module.exports = app;
