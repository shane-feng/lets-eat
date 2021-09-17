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

// retrieves all food items
router.get('/', async (req, res) => {
  try {
    const results = await Food.find();
    res.send(results);
  } catch (e) {
    res.status(500).send();
  }
});

// retrieves all food items that are to be eaten today
router.get('/:date', async (req, res) => {
  const today = new Date(req.params.date);

  try {
    const results = await Food.find();
    filteredResults = results.filter(
      ({ dateToEat }) =>
        dateToEat?.getFullYear() == today.getFullYear() &&
        dateToEat?.getMonth() == today.getMonth() &&
        dateToEat?.getDate() + 1 == today.getDate()
    );
    res.send(filteredResults);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
