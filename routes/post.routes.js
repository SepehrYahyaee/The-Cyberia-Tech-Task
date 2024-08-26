import express from "express";
import { PostController } from "../controllers/index.js";
import { authentication } from "../middlewares/index.js";

export const router = express.Router(); // api/post
const postController = new PostController();

router.route("/newWithoutAuth")
    .post(postController.createPostWithoutAuth);

router.route("/new")
    .post(authentication, postController.createPost);

router.route("/:id")
    .get(postController.getSpecificPost)
    .patch(authentication, postController.updatePost)
    .delete(authentication, postController.deletePost);

router.route("/")
    .get(postController.getAllPosts);