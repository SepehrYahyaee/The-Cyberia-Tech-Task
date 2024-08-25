import crypto from "node:crypto";

export async function verify(storedHash, password) {
    return new Promise((resolve, reject) => {
        const [salt, key] = storedHash.split(":");
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}