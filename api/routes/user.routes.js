const express = require("express");
const router = express.Router();

const { forceAuth } = require("../middlewares/authentication");
const { adminOnly } = require("../middlewares/authorization");
const {
    createDeoCredentials,
    handleLogin,
    updatePassword,
    handleLogout,
    handleUpdate,
    forgotPassword,
    resetPassword,
    getUserProfile,
    createDoctorCredentials
} = require("../controllers/user.controllers");

router.post("/create-deo", forceAuth(), adminOnly(), createDeoCredentials);
router.post("/create-doctor", forceAuth(), adminOnly(), createDoctorCredentials);
router.post("/login", handleLogin);
router.post("/logout", forceAuth(), handleLogout);
router.patch("/update-password", forceAuth(), updatePassword);
router.patch("/update", forceAuth(), handleUpdate);
router.post("/forgot-password", forceAuth(), forgotPassword);
router.patch("/:id/:token", resetPassword);
router.get("/profile", forceAuth(), getUserProfile);

module.exports = router;