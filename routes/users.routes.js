let express = require("express");
let userRouter = express.Router();
let { UserModel } = require("../model/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// register/signup
userRouter.post("/register", async (req, res) => {
  let { email, password, name, contact, role } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new UserModel({ email, password: hash, name, contact, role });
      await user.save();
      res.status(200).send({ msg: "Registration Successful" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successful",
            token: jwt.sign({ userID: user[0]._id }, "tmrow"),
          });
        } else {
          res.status(400).send({ msg: "wrong Password" });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Email" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
