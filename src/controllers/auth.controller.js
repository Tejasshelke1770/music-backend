import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const handleRegisterUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({ message: "user already exist!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "success",
    user,
  });
};

export const handleLoginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credientials!" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid Crediantials!" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Successfully loged in!",
    user: {
      id: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
  });
};

export const handleLogoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully!" });
};
