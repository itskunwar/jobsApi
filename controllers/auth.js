const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJwt();
    res.status(201).json({ name, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found!");
      err.statusCode = 404;
      throw err;
    }
    const passwordVerification = await user.isMatch(password);
    if (!passwordVerification) {
      const err = new Error("Invalid credentials, password do not match!");
      err.statusCode = 400;
      throw err;
    }
    const token = user.createJwt();
    res.status(200).json({ name: user.name, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login };
