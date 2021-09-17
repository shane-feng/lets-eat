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

// fetch food items
router.get('/', async (req, res) => {
  // fetch food items that should be eaten today
  if (req.query.date) {
    const today = new Date();

    try {
      const results = await Food.find();
      filteredResults = results.filter(({ dateToEat }) => {
        return (
          dateToEat?.getFullYear() == today.getFullYear() &&
          dateToEat?.getMonth() == today.getMonth() &&
          dateToEat?.getDate() + 1 == today.getDate()
        );
      });
      res.send(filteredResults);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  } else {
    // fetch all food items
    try {
      const results = await Food.find();
      res.send(results);
    } catch (e) {
      res.status(500).send();
    }
  }
});

module.exports = router;
