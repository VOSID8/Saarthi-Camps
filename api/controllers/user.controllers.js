const asyncHandler = require("express-async-handler");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const { sendTemporaryPassword, sendPasswordResetEmail } = require("../services/emailUtils");
const { generateAccessToken } = require("../security/accessTokenUtils");
const { generateRefreshToken } = require("../security/refreshTokenUtils");

const createDeoCredentials = asyncHandler(async (req, res) => {
    console.log("gyu");
    // create random password of 6 characters
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const password_length = 6;
    let password = '';
    for (var i = 0; i < password_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        password += chars.substring(rnum, rnum + 1);
    }
    console.log("gyu");
    req.body.password = password;
    req.body.role = "dataEntryOperator";
    console.log("gyu");
    let user = null;
    console.log("gyu");
    try{
        console.log("gyu");
        user = await User.create(req.body);
        console.log("HAey");
        //send email to deo with temporary password
        sendTemporaryPassword(req.body.name, req.body.email, req.body.password);
        console.log("HAey");
   
    } catch(e){
        res.status(400);
        throw new Error("Duplicate email address");
    }
    res.json(user);
});

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User with specified email address doesn't exist");
    }

    if (user && await user.isPasswordMatch(password)) {
        const accessToken = generateAccessToken(user._id, user.email, user.password, user.role);
        const refreshToken = generateRefreshToken(user._id, user.email, user.password, user.role);

        user.refreshTokens.push({ refreshToken });
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            domain: 'localhost:5173',
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        res.json({user, accessToken});
    }
    else {
        res.status(400);
        throw new Error("The password you provided is incorrect");
    }
});

const handleLogout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");

    req.user.refreshTokens = req.user.refreshTokens.filter((token) => {
        return token.refreshToken !== req.refreshToken
    });
    await req.user.save();

    res.json(req.user);
});

const updatePassword = asyncHandler(async (req, res) => {
    req.user.password = req.body.password;
    await req.user.save();
    res.json(req.user);
});

const handleUpdate = asyncHandler(async (req, res) => {
    const updateFields = Object.keys(req.body);
    updateFields.forEach((update) => {
        req.user[update] = req.body[update];
    });
    
    if(req.user.isModified("role")){
        req.user.role = "dataEntryOperator"
    }
    await req.user.save();

    res.json(req.user);
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { id, email } = req.user;
    const payload = { id, email };
    const RESET_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET + req.user.password
    const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, { expiresIn: '10m' });

    sendPasswordResetEmail(email, id, resetToken);
    res.json();
});

const resetPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params
    const { newPassword } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(400)
            throw new Error("User doesn't exists")
        }

        const RESET_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET + user.password
        const payload = jwt.verify(token, RESET_TOKEN_SECRET)
        if (id !== payload.id) {
            res.status(400)
            throw new Error("This url doesn't exists")
        }

        user.password = newPassword
        await user.save()
        res.send("Password reset successfully")

    } catch (e) {
        throw new Error(e)
    }
});

module.exports = {
    createDeoCredentials,
    handleLogin,
    handleLogout,
    updatePassword,
    handleUpdate,
    forgotPassword,
    resetPassword
}