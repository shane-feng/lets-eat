const express = require('express');
const auth = require('../middleware/auth');
const Food = require('../models/food');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const food = new Food({ ...req.body, owner: req.user._id });

  try {
    await food.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

// fetch food items
router.get('/', auth, async (req, res) => {
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
      const results = await Food.find({ owner: req.user._id });
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
      const results = await Food.find({ owner: req.user._id });
      res.send(results);
    } catch (e) {
      res.status(500).send();
    }
  }
});

// update food item details
router.patch('/:id', auth, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ['picture', 'name', 'dateToEat'];
  const isValidUpdate = updateFields.every((update) => allowedUpdateFields.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ errror: 'Invalid update fields.' });
  }

  try {
    const food = await Food.findOne({ _id: req.params.id, owner: req.user._id });

    if (!food) {
      return res.status(404).send();
    }

    updateFields.forEach((update) => (food[update] = req.body[update]));
    await food.save();
    res.send(food);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete food item
router.delete('/:id', auth, async (req, res) => {
  try {
    const food = await Food.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!food) {
      return res.status(404).send();
    }

    res.send(food);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
