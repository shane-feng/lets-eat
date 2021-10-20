const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
