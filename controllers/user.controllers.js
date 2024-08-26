import { UserService } from "../services/index.js";
import { hash, verify, createToken } from "../providers/index.js";
import { AppError } from "../utilities/index.js";

const userService = new UserService();

export class UserController {

    async register(req, res) {
        // Get the password, hash it and save into the database.
        const hashedPassword = await hash(req.body.password);
        return res.status(201).send(await userService.createUser(req.body.userName, hashedPassword))
    }

    async login(req, res) {
        // Check the availability of the user
        const user = await userService.getUserByUserName(req.body.userName);
        if (!user) throw new AppError("Username or password does not match!", 400);

        // Check if the passwords match
        const checkPassword = await verify(user.password, req.body.password);
        if (!checkPassword) throw new Error("Username or password does not match!", 400);

        // If it matches, provide with the access token.
        return res.status(200).send(await createToken({ id: user.id }, process.env.SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRE_TIME));
    }

    async getSpecificUser(req, res) {
        // Check if the user exists.
        const user = await userService.getUser(+req.params.id);
        if (!user) throw new AppError("User not found!", 404);

        return res.status(200).send(user);
    }

    async getAllUsers(req, res) {
        return res.status(200).send(await userService.getAllUsers());
    }
}