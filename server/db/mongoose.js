const mongoose = require('mongoose');
const { dbURL } = require('../config');

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log(error));
