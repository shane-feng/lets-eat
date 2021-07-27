const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routes/users');
const app = express();

app.use(cors());
app.use(express.json());

// mount user routes
app.use('/users', userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
