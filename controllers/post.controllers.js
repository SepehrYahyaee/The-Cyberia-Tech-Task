import { PostService } from "../services/index.js";
import { AppError, logger } from "../utilities/index.js";

const postService = new PostService();

export class PostController {

    async createPost(req, res) {
        const post = await postService.createPost(req.body.title, req.body.content, +req.user.id);
        res.status(201).send(post);
        return logger.info(`New post with the id of ${post.id} has been created by user ${post.author}.`);
    }

    async createPostWithoutAuth(req, res) {
        res.status(201).send(await postService.createPost(req.body.title, req.body.content, +req.body.id));
        return logger.info(`A new post without authentication has been created by user ${req.body.id}.`);
    }

    async getSpecificPost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post not found!", 404);

        res.status(200).send(post);
        return logger.info(`Post with the id of ${post.id} has been viewed.`);
    }

    async getAllPosts(req, res) {
        res.status(200).send(await postService.getAllPosts());
        return logger.info("All posts have been viewed.");
    }

    async updatePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post does not exist!", 404);

        if (post.author !== +req.user.id) {
            throw new AppError("You are not the author of this post therefore you cannot edit it.", 401);
        } else {
            res.status(201).send(await postService.updatePost(+req.params.id, +req.user.id, req.body));
            return logger.info(`Post with the id of ${post.id} has been updated successfully.`);
        }
    }

    async deletePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post does not exist!", 404);

        if (post.author !== +req.user.id) throw new AppError("You are not the author of this post therefore you cannot delete it.", 401);

        res.status(204).send(await postService.deletePost(+req.params.id));
        return logger.info(`Post with the id of ${post.id} has been successfully deleted.`);
    }
}