const { generateAccessToken } = require("../security/accessTokenUtils");
const asyncHandler = require("express-async-handler");

const handleTokenRenew = asyncHandler(async (req, res) => {
    const user = req.user;
    const accessToken = generateAccessToken(user._id, user.email, user.password, user.role);
    res.json({user, accessToken});
});

module.exports = { handleTokenRenew };