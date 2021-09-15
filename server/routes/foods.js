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

router.get('/', async (req, res) => {
  try {
    const results = await Food.find({});
    res.send(results);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
