import express from "express";
import { PostController } from "../controllers/index.js";
import { asyncErrorHandler } from "../utilities/index.js";
import {
    authentication,
    validationErrorHandler,
    createPostWithoutAuthValidators,
    createPostValidators,
    getSpecificPostValidators,
    updatePostValidators,
    deletePostValidators,
 } from "../middlewares/index.js";

export const router = express.Router(); // api/post
const postController = new PostController();

router.route("/newWithoutAuth")
    .post(createPostWithoutAuthValidators, validationErrorHandler, asyncErrorHandler(postController.createPostWithoutAuth));

router.route("/new")
    .post(authentication, createPostValidators, validationErrorHandler, asyncErrorHandler(postController.createPost));

router.route("/:id")
    .get(getSpecificPostValidators, validationErrorHandler, asyncErrorHandler(postController.getSpecificPost))
    .patch(authentication, updatePostValidators, validationErrorHandler, asyncErrorHandler(postController.updatePost))
    .delete(authentication, deletePostValidators, validationErrorHandler, asyncErrorHandler(postController.deletePost));

router.route("/")
    .get(asyncErrorHandler(postController.getAllPosts));