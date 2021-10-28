const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, History } = require("../schema/index");
class UserController {
  static async Login(req, res) {
    try {
      const { body } = req;
      const { email, password } = body;
      const emailExist = await User.exists({ email });
      if (!emailExist) throw new Error("Wrong Email & Pass");
      const userData = await User.findOne({ email });
      let checkPass = await bcrypt.compare(password, userData.password);
      if (!checkPass) throw new Error("Wrong Email / Password");
      let data = {
        _id: userData._id,
      };
      let secret = process.env.SECRET;
      let token = await jwt.sign(data, secret);
      return res.status(200).json({
        message: "Login Success",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Login Failed",
        error: error.message,
      });
    }
  }
  static async Register(req, res) {
    try {
      const { body } = req;
      const { name, email, phoneNumber, password } = body;
      const salt = process.env.SALT;
      let pass = await bcrypt.hash(password, Number(salt));
      const query = { name, email, phoneNumber, password: pass };
      let createAcc = await User.create(query);
      return res.status(201).json({
        message: "Register Success",
        emailRegistered: createAcc.email,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Register Failed",
        error: error.message,
      });
    }
  }
  static async GetBalance(req, res) {
    try {
      const { authenticated } = req;
      const userExist = await User.exists({ _id: authenticated._id });
      if (!userExist) throw new Error("User Does Not Exist");
      const userBalance = await User.findOne({ _id: authenticated._id }).select(
        "balance name phoneNumber"
      );
      return res.status(200).json({
        message: "Get Balance Success",
        data: {
          name: userBalance.name,
          phoneNumber: userBalance.phoneNumber,
          balance: userBalance.balance,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get Balance Failed",
        error: error.message,
      });
    }
  }
  static async AddBalance(req, res) {
    try {
      const { authenticated, body } = req;
      body._id = authenticated._id;
      const result = await axios({
        url: `${process.env.BALANCESERVER}/user/balance`,
        method: "POST",
        data: body,
        headers: {
          token: req.headers.token,
        },
      });
      if (result.data.error) throw new Error(result.data.error);
      return res.status(200).json({
        message: "Add Balance Success",
        data: result.data.data,
      });
    } catch (error) {
      if (error.response !== undefined) {
        return res.status(400).json({
          message: "Add Balance Failed",
          error: error.response.data.error,
        });
      } else {
        return res.status(400).json({
          message: "Add BalanceFailed",
          error: error.message,
        });
      }
    }
  }
  static async GetHistory(req, res) {
    try {
      const { authenticated } = req;
      const userExist = await User.exists({ _id: authenticated._id });
      if (!userExist) throw new Error("User Does Not Exist");
      let searchID = mongoose.Types.ObjectId(authenticated._id);
      let data = await User.aggregate([
        {
          $match: { _id: searchID },
        },
        {
          $project: {
            _id: 1,
            history: 1,
          },
        },
        {
          $lookup: {
            from: "histories",
            localField: "history",
            foreignField: "_id",
            as: "balanceHistory",
          },
        },
        {
          $project: {
            history: 0,
            "balanceHistory._id": 0,
            "balanceHistory.owner": 0
          },
        },
      ]);
      return res.status(200).json({
        message: "Get History Success",
        data: data[0],
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get History Failed",
        error: error.message,
      });
    }
  }
}
module.exports = UserController;
