import jwt from "jsonwebtoken";
import { UserService } from "../services/index.js";
import { AppError } from "../utilities/index.js";

const userService = new UserService();

export async function authentication(req, res, next) {
    try {

        // If no bearer token has been provided, then it's not going to proceed.
        if (!req.headers.authorization) throw new AppError("Token is required in headers!", 401);

        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        if (payload){
            req.user = await userService.getUser(payload.id);
            next();
        } else {
            throw new Error("Token is wrong!", 400);
        }
    } catch (error) {
        next(error);
    }
}