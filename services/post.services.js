import connection from "../db.js";

export class PostService {
    db = connection;

    createPost(title, content, author) {
        return this.db.post.create({
            data: {
                title, content, author
            }
        })
    }

    getSpecificPost(id) {
        return this.db.post.findUnique({
            where: { id }
        })
    }

    getAllPosts() {
        return this.db.post.findMany();
    }

    updatePost(id, userId, updateData) {
        return this.db.post.update({
            where: {
                id
            },
            data: {
                ...updateData,
                author: userId
            }
        })
    }

    deletePost(id) {
        return this.db.post.delete({
            where: {
                id
            }
        })
    }

}