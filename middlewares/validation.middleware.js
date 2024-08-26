import { body, param, validationResult, checkExact } from "express-validator";
import { AppError } from "../utilities/index.js";

export function validationErrorHandler(req, res, next) {
    try {
        const isValid = validationResult(req);
        if (!isValid.isEmpty()) {
            const message = isValid.errors[0].msg;
            throw new AppError(message, 400);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

export const registerValidators = [
    body("userName").isString().trim().escape().notEmpty().isLength({ min: 4, max: 32 }).withMessage("username validation error"),
    body("password").isString().trim().escape().notEmpty().isLength({ min: 4, max: 24 }).withMessage("password validation error"),
    checkExact()
];

export const loginValidators = [
    body("userName").isString().trim().escape().notEmpty().withMessage("username validation Error!"),
    body("password").isString().trim().escape().notEmpty().withMessage("password validation Error!"),
    checkExact()
];

export const getSpecificUserValidators = [
    param("id").isNumeric().trim().escape().withMessage("user id validation error"),
    checkExact()
];

export const createPostWithoutAuthValidators = [
    body("title").isString().trim().escape().notEmpty().isLength({ max: 64 }).withMessage("title validation error"),
    body("content").isString().trim().escape().notEmpty().isLength({ max: 255 }).withMessage("content validation error"),
    body("id").isNumeric().trim().escape().notEmpty().withMessage("userId validation error"),
    checkExact()
];

export const createPostValidators = [
    body("title").isString().trim().escape().notEmpty().isLength({ max: 64 }).withMessage("title validation error"),
    body("content").isString().trim().escape().notEmpty().isLength({ max: 255 }).withMessage("content validation error"),
    checkExact()
];

export const getSpecificPostValidators = [
    param("id").isNumeric().trim().escape().withMessage("post id validation error"),
    checkExact()
];

export const updatePostValidators = [
    body('title').isString().trim().escape().optional().isLength({ max: 64 }).withMessage('title update validation Error!'),
    body('content').isString().trim().escape().optional().isLength({ max: 255 }).withMessage('content update validation Error!'),
    checkExact()
];

export const deletePostValidators = [
    param("id").isNumeric().trim().escape().withMessage("post id validation error"),
    checkExact()
];