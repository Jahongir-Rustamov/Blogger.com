import UserModel from "../models/user.js";
import bycryptjs from "bcryptjs";
import { generateToken } from "../utills/generateToken.js";
import lodash from "lodash";
export async function SignUp(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required ⚠️" });
    }
    const ExistEmail = await UserModel.findOne({ email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email !" });
    }
    if (ExistEmail) {
      return res.status(400).json({ message: "This email already exist 🙅‍♂️" });
    }

    const newUser = await UserModel({
      name,
      email,
      password,
    });
    await newUser.save();
    const salt = await bycryptjs.genSalt(10);
    const hashPasword = await bycryptjs.hash(password, salt);
    newUser.password = hashPasword;
    await newUser.save();
    //Generate token here
    generateToken(newUser._id, res);
    res.status(201).json(lodash.pick(newUser, ["email", "name", "_id"]));
  } catch (error) {
    console.log("Error in SignupController:", error.message);
    res
      .status(500)
      .json({ message: "An occurred error:", error: error.message });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ⚠️" });
    }
    const isLogin = await UserModel.findOne({ email });
    if (!isLogin) {
      return res.status(400).json({ message: "Invalid password or email !" });
    }
    const comparePassword = bycryptjs.compare(password, isLogin.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid password or email !" });
    }

    generateToken(isLogin._id, res);
    res.status(200).json(lodash.pick(isLogin, ["email", "name", "_id"]));
  } catch (error) {
    console.log("Error in LoginController:", error.message);
    res
      .status(500)
      .json({ message: "An occurred error:", error: error.message });
  }
}

export async function LogOut(req, res) {
  try {
    res.clearCookie("my_blog");
    res.status(200).json({ message: "Successfully logOut " });
  } catch (error) {
    console.log("Error in LogOut controller:", error.message);
    res
      .status(500)
      .json({ message: "An occurred error:", error: error.message });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in authCheck:", error.message);
    return res
      .status(500)
      .json({ message: "An occurred error:", error: error.message });
  }
}
