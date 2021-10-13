const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

//@route /api/auth
//desc load user
//access token public

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'user not found' });
    else return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
});

//@route /api/auth/register
//@desc register user
//access token public

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing field' });
  }

  try {
    //check existing user
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'username has already taken' });
    }

    //all good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    // return tokens
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'sign up successfully!',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//@route /api/auth/login
//@desc login user
//access token public

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    // check existing user
    const user = await User.findOne({ username });
    if (!user) {
      console.log(user);
      return res
        .status(400)
        .json({ success: false, message: 'Username or password is incorrect' });
    }

    //load hashedPaswword
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Username or password is incorrect' });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: 'Logged in successfully!',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
});

module.exports = router;
