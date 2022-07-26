const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const { expressjwt: jwt } = require("express-jwt");

router.post("/users", userController.createUser);
router.get(
  "/private",
  jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
  }),
  userController.private
);

router.post("/tokens", userController.login)


module.exports = router;
