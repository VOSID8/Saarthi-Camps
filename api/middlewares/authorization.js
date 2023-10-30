const asyncHandler = require("express-async-handler");

const adminOnly = () => {
    return asyncHandler(async (req, res, next) => {
        if (req.user.role === "admin") next();
        else {
            res.status(403);
            throw new Error("Data Entry Operators are not authorized to access this resource");
        }
    });
};

const dataEntryOperatorOnly = () => {
    return asyncHandler(async (req, res, next) => {
        if (req.user.role === "dataEntryOperator") next();
        else {
            res.status(403);
            throw new Error("Admins are not authorized to access this resource");
        }
    });
};

module.exports = { adminOnly, dataEntryOperatorOnly };