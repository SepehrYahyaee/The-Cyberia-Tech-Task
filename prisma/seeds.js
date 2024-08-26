import connection from "../db.js";
import { hash } from "../providers/index.js";

const users = [
    {
        id: 1,
        userName: "Hasan",
        password: "1234",
    },
    {
        id: 2,
        userName: "Heshmat",
        password: "1234",
    },
    {
        id: 3,
        userName: "Gholam",
        password: "1234",
    },
];

async function main() {

    await connection.user.deleteMany({});
    await connection.post.deleteMany({});

    for (const user of users) {
        await connection.user.create({
        data: {
            id: user.id,
            userName: user.userName,
            password: await hash(user.password)
        }
        });
    }

    await connection.post.create({
        data: {
            title: "New Post",
            content: "A sample content for this post",
            author: 1
        }
    })
}

main();