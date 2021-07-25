const mongoose = require('mongoose');

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('mongodb connected');
    }
  }
);
