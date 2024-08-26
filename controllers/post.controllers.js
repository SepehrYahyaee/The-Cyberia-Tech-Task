import { PostService } from "../services/index.js";

const postService = new PostService();

export class PostController {

    async createPost(req, res) {
        return res.status(201).send(await postService.createPost(req.body.title, req.body.content, +req.user.id));
    }

    async createPostWithoutAuth(req, res) {
        return res.status(201).send(await postService.createPost(req.body.title, req.body.content, req.body.id));
    }

    async getSpecificPost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new Error("Post not found!");

        return res.status(200).send(post);
    }

    async getAllPosts(req, res) {
        return res.status(200).send(await postService.getAllPosts());
    }

    async updatePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new Error("Post does not exist!");

        if (post.author === +req.user.id) throw new Error("You are not the author of this post therefore you cannot edit it.");

        return res.status(201).send(await postService.updatePost(+req.params.id, +req.user.id, req.body));
    }

    async deletePost(req, res) {
        const post = await postService.getSpecificPost(+req.params.id);

        if (!post) throw new Error("Post does not exist!");

        if (post.author === +req.user.id) throw new Error("You are not the author of this post therefore you cannot delete it.");

        return res.status(204).send(await postService.deletePost(+req.params.id));
    }
}