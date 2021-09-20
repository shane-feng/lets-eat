const express = require('express');

const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
