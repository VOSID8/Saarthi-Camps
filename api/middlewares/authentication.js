const User = require("../models/user.models.js")
const asyncHandler = require("express-async-handler");
const { validateAccessToken } = require("../security/accessTokenUtils.js");

const forceAuth = () => {
    return asyncHandler(async (req, res, next) => {
        const accessToken = req.header("Authorization")?.replace("Bearer ", "");
        // const refreshToken = req.cookies["refreshToken"];
        if (!accessToken) {
            res.status(401);
            throw new Error("Client is currently logged out");
        }
        const userPayload = validateAccessToken(accessToken);
        const user = await User.findById(userPayload.id);

        if (!user) {
            res.status(401);
            throw new Error();
        }

        // req.refreshToken = refreshToken;
        req.user = user;
        next();
    });
};

const checkAuth= () => {
    return async (req, res, next) => {
        const accessToken = req.header("Authorization")?.replace("Bearer ", "");
        // const refreshToken = req.cookies["refreshToken"];
        if (!accessToken) return next();

        try {
            const userPayload = validateAccessToken(accessToken);
            const user = await User.findById(userPayload.id);
            req.user = user;
            // req.refreshToken = refreshToken;
            next();
        } catch (error) {
            next();
        }
    }
}

module.exports = {
    forceAuth,
    checkAuth
}