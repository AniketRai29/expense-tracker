const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters"
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {
      return res.status(400).json({
        message:
          "Invalid email format"
      });
    }

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        fullName,
        email,
        password:
          hashedPassword
      });

    res.status(201).json({
      _id: user._id,
      fullName:
        user.fullName,
      email: user.email,
      token:
        generateToken(
          user._id
        )
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    res.json({
      _id: user._id,
      fullName:
        user.fullName,
      email: user.email,
      token:
        generateToken(
          user._id
        )
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

const getUserProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select(
          "-password"
        );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

const updateProfileImage =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found"
        });
      }

      user.profileImage =
        req.body.profileImage;

      await user.save();

      res.json({
        success: true,
        profileImage:
          user.profileImage
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileImage
};