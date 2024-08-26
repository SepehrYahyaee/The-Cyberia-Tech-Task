import express from "express";
import { UserController } from "../controllers/index.js";
import { asyncErrorHandler } from "../utilities/index.js";
import { validationErrorHandler, registerValidators, loginValidators, getSpecificUserValidators } from "../middlewares/index.js";

export const router = express.Router(); // api/user
const userController = new UserController();

router.route("/register")
    .post(registerValidators, validationErrorHandler, asyncErrorHandler(userController.register));

router.route("/login")
    .post(loginValidators, validationErrorHandler, asyncErrorHandler(userController.login));

router.route("/:id")
    .get(getSpecificUserValidators, validationErrorHandler, asyncErrorHandler(userController.getSpecificUser));

router.route("/")
    .get(asyncErrorHandler(userController.getAllUsers));