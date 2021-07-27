const { Schema, model } = require('mongoose');

const foodSchema = new Schema(
  {
    picture: {
      type: Buffer,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateToEat: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Food = model('Food', foodSchema);

module.exports = Food;
