const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(400).json({ mssg: error.message });
  }
};

// signup user
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).json({ mssg: error.message });
  }
};

const getUsers = async (req, res) => {
  console.log(`User ${req.user._id} requested the list of all users.`);

  try {
    const users = await User.find({})
      .select("email password")
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ mssg: "Error fetching user list from database." });
  }
};

module.exports = {
  login,
  signup,
  getUsers,
};
