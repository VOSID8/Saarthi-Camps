const asyncHandler = require("express-async-handler");

const adminOnly = () => {
    return asyncHandler(async (req, res, next) => {
        console.log("admin");
        if (req.user.role === "admin") {
            console.log("admin");
            next();

        }
        else {
            res.status(403);
            throw new Error("Only admins are authorized to access this resource");
        }
    });
};

const dataEntryOperatorOnly = () => {
    return asyncHandler(async (req, res, next) => {
        console.log("deo");
        if (req.user.role === "dataEntryOperator") next();
        else {
            res.status(403);
            throw new Error("Only data entry operators are authorized to access this resource");
        }
    });
};

const doctorAndDeoOnly = () => {
    return asyncHandler(async (req, res, next) => {
        console.log("doctor");
        if (req.user.role === "doctor") next();
        else {
            res.status(403);
            throw new Error("Only doctors and data entry operators authorized to access this resource");
        }
    })
}

module.exports = { adminOnly, dataEntryOperatorOnly, doctorAndDeoOnly };