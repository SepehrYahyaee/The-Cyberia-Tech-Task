import connection from "../db.js";

export class UserService {
    db = connection;

    createUser(userName, password) {
        return this.db.user.create({
            data: { userName, password }
        })
    }

    getUserByUserName(userName) {
        return this.db.user.findUnique({
            where: { userName }
        })
    }

    getUser(id) {
        return this.db.user.findUnique({
            where: { id },
            select: { id: true, userName: true, createdAt: true }
        })
    }

    getAllUsers() {
        return this.db.user.findMany({
            where: {}, select: { id: true, userName: true, createdAt: true }
        })
    }
}