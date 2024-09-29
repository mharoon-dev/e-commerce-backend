import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // email is already exist
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json("Email already exists!");
  }

  // userName is already exist
  const userName = await User.findOne({ username: req.body.username });
  if (userName) {
    return res.status(409).json("User name already exists!");
  }

  //  check phone number is already exist
  const phoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (phoneNumber) {
    return res.status(409).json("Phone number already exists!");
  }

  // check byRefrence
  const byRefrence = await User.findOne({
    refrenceCode: req?.body?.byRefrence,
  });
  if (!byRefrence) {
    return res.status(409).json("Refrence code does not exists!");
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    refrenceCode: req.body.refrenceCode ? req.body.refrenceCode : undefined,
    byRefrence: req?.body?.byRefrence ? req?.body?.byRefrence : "",
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    img: req.body.img ? req.body.img : "",
    bouns: req.body.bouns ? req.body.bouns : 0,
    refrenceUsers: req.body.refrenceUsers ? req.body.refrenceUsers : [],
    phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : "",
    winDrawReq: req.body.winDrawReq ? req.body.winDrawReq : false,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);

    // add this user in refrence code user's array
    if (req?.body?.byRefrence) {
      const updateUser = await User.findOneAndUpdate(
        {
          refrenceCode: req?.body?.byRefrence,
        },
        {
          $push: { refrenceUsers: savedUser?._id },
          $inc: { bonus: 200 },
        },
        { new: true }
      );
    }
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong username!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const isUserLoggedIn = async (req, res) => {
  try {
    const userData = req.user;
    if (userData) {
      console.log(userData, "====>> userData");
      return res.status(200).json({
        status: true,
        message: "User is logged in",
        data: userData,
      });
    } else {
      console.log("User is not logged in");
    }
  } catch (error) {
    return res
      .status(500) //INTERNALERROR
      .send(error.message);
  }
};

export const googleAuth = (req, res) => {
  res.send("googleAuth");
};
