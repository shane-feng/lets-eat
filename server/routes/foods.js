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
  const { date } = req.query;

  // fetch food items that should be eaten today
  if (date) {
    const today = new Date();
    const queryDate = new Date(date);

    // prevents requests that have date query strings that dont match todays date as we only want food that will be eaten today
    if (
      queryDate.getFullYear() != today.getFullYear() ||
      queryDate.getMonth() != today.getMonth() ||
      queryDate.getDate() + 1 != today.getDate()
    ) {
      res.status(422).send();
      return;
    }

    try {
      const results = await Food.find();
      filteredResults = results.filter(({ dateToEat }) => {
        console.log(dateToEat);
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

// update food item details
router.patch('/:id', async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ['picture', 'name', 'dateToEat'];
  const isValidUpdate = updateFields.every((update) => allowedUpdateFields.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ errror: 'Invalid update fields.' });
  }

  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!food) {
      return res.status(404).send();
    }

    res.send(food);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete food item
router.delete('/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send();
    }
    res.send(food);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
