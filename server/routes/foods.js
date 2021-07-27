const express = require('express');

const Food = require('../models/food');
const router = express.Router();

router.post('/', async (req, res) => {
  const food = new Food(req.body);
  try {
    await food.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

module.exports = router;
