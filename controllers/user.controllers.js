import { UserService } from "../services/index.js";
import { hash, verify, createToken } from "../providers/index.js";
import { AppError, logger } from "../utilities/index.js";

const userService = new UserService();

export class UserController {

    async register(req, res) {
        // Get the password, hash it and save into the database.
        const hashedPassword = await hash(req.body.password);
        res.status(201).send(await userService.createUser(req.body.userName, hashedPassword))
        return logger.info(`A new user named ${req.body.userName} registered.`);
    }

    async login(req, res) {
        // Check the availability of the user
        const user = await userService.getUserByUserName(req.body.userName);
        if (!user) throw new AppError("Username or password does not match!", 400);

        // Check if the passwords match
        const checkPassword = await verify(user.password, req.body.password);
        if (!checkPassword) throw new Error("Username or password does not match!", 400);

        // If it matches, provide with the access token.
        res.status(200).send(await createToken({ id: user.id }, process.env.SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRE_TIME));
        return logger.info(`A user with the username of ${user.userName} has logged in.`);
    }

    async getSpecificUser(req, res) {
        // Check if the user exists.
        const user = await userService.getUser(+req.params.id);
        if (!user) throw new AppError("User not found!", 404);

        res.status(200).send(user);
        return logger.info(`Username of ${user.userName} has been viewed.`);
    }

    async getAllUsers(req, res) {
        res.status(200).send(await userService.getAllUsers());
        return logger.info("All users have been viewed by someone.");
    }
}