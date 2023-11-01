const jwt = require("jsonwebtoken");

const secret = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (id, email, password, role) => {
    const payload = { id, email, password, role };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const validateAccessToken = (accessToken) => {
    const payload = jwt.verify(accessToken, secret);
    return payload;
}

module.exports = {
    generateAccessToken,
    validateAccessToken
}