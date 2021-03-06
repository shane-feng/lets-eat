const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, tokenExpiresInHours } = require('../config');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// add user instance method to filter user object for when user object is stringified
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  return userObject;
};

// add user instance method to generate jwt
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: tokenExpiresInHours });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// create static method on User model to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// middleware to hash user password prior to saving to mongodb
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = model('User', userSchema);

module.exports = User;
