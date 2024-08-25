import jwt from "jsonwebtoken";

export async function createToken(payload, secretKey, expireTime) {
    try {
        const accessToken = jwt.sign(payload, secretKey, { expiresIn: expireTime });
        return { accessToken };
    } catch (error) {
        throw new Error("Failed to create the access token!");
    }
}