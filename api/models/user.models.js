const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: {
            validator: function (value) {
                return !value.toLowerCase().includes("password");
            },
            message: `Password should not contain "password"`
        }
    },
    role: {
        type: String,
        enum: ["dataEntryOperator", "admin"],
        default: "dataEntryOperator"
    },
    refreshTokens: [
        {
            refreshToken: {
                type: String,
                required: true
            }
        }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject._id;
    delete userObject.password;
    delete userObject.refreshTokens;
    delete userObject.__v;
    return userObject;
}

const User = mongoose.model("User", userSchema);
module.exports = User;