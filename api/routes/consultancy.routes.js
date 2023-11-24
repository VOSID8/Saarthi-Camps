const express = require("express");
const router = express.Router();

const {
    postConsultancy
} = require("../controllers/consultancy.controllers");

router.post("/:refugeeId", postConsultancy);

module.exports = router;