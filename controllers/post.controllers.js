import { PostService } from "../services/index.js";
import { AppError } from "../utilities/index.js";

const postService = new PostService();

export class PostController {

    async createPost(req, res) {
        return res.status(201).send(await postService.createPost(req.body.title, req.body.content, +req.user.id));
    }

    async createPostWithoutAuth(req, res) {
        return res.status(201).send(await postService.createPost(req.body.title, req.body.content, +req.body.id));
    }

    async getSpecificPost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post not found!", 404);

        return res.status(200).send(post);
    }

    async getAllPosts(req, res) {
        return res.status(200).send(await postService.getAllPosts());
    }

    async updatePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post does not exist!", 404);

        if (post.author !== +req.user.id) {
            throw new AppError("You are not the author of this post therefore you cannot edit it.", 401);
        } else {
            return res.status(201).send(await postService.updatePost(+req.params.id, +req.user.id, req.body));
        }
    }

    async deletePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new AppError("Post does not exist!", 404);

        if (post.author !== +req.user.id) throw new AppError("You are not the author of this post therefore you cannot delete it.", 401);

        return res.status(204).send(await postService.deletePost(+req.params.id));
    }
}