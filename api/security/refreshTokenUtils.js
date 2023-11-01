const jwt = require("jsonwebtoken");

const secret = process.env.REFRESH_TOKEN_SECRET;

const generateRefreshToken = (id, email, password, role) => {
    const payload = { id, email, password, role };
    return jwt.sign(payload, secret, { expiresIn: '30d' });
}

const validateRefreshToken = (refreshToken) => {
    const payload = jwt.verify(refreshToken, secret);
    return payload;
}

module.exports = {
    generateRefreshToken,
    validateRefreshToken
}