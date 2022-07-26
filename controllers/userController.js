const mongoose = require("mongoose");
const Validator = require("validatorjs");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");
// Try es buena practica

const createUser = async (req, res) => {
  try {
    const validationRules = {
      firstname: "required",
      lastname: "required",
      email: "required|email",
      password: "required",
    };

    const validation = new Validator(req.body, validationRules);
    if (validation.passes()) {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      const response = req.body;
      response.token = jwt.sign(req.body, process.env.TOKEN_SECRET);
      delete response.password;
      res.status(201).json(response);
    } else {
      res.status(400).json({ "status code": 400, detail: "Bad Request" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ "status code": 500, detail: "Internal Server Error" });
    console.log(error);
  }
};

const private = (req, res) => {
  delete req.auth.password;
  res.json(req.auth);
};

const login = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const validationRules = {
      email: "required|email",
      password: "required",
    };
    const validation = new Validator(req.body, validationRules);
    if (validation.passes()) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ detail: "Not Found" });
      }
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result === true) {
          let response = req.body;
          response.token = jwt.sign(req.body, process.env.TOKEN_SECRET);
          delete response.password;
          res.send(response);
        } else {
          res.status(400).json({ "status code": 400, detail: "Bad Request" });
        }
      });
    } else {
      res.status(400).json({ "status code": 400, detail: "Bad Request" });
    }
  } catch (error) {
    res
    .status(500)
    .json({ "status code": 500, detail: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  private,
  login,
};
