import express from "express";
import { UserController } from "../controllers/index.js";

export const router = express.Router(); // api/user
const userController = new UserController();

router.route("/register")
    .post(userController.register);

router.route("/login")
    .post(userController.login);

router.route("/:id")
    .get(userController.getSpecificUser);

router.route("/")
    .get(userController.getAllUsers);