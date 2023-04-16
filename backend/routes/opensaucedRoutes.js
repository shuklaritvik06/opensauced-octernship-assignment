const express = require("express");
const {
  LoginController,
  EmailController
} = require("../controllers/opensaucedController");
const Router = express.Router();
Router.post("/login", LoginController);
Router.post("/email", EmailController);
module.exports = Router;
