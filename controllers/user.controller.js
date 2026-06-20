const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Register Api",
      error,
    });
  }
};

// Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ email });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    // match password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({
        success: false,
        message: "invalid credentials",
      });
    }
    // Token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "login Api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
