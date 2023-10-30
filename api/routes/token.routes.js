const express = require("express");
const { handleTokenRenew } = require("../controllers/token.controllers");
const router = express.Router();

router.post("/renew", handleTokenRenew);

module.exports = router;