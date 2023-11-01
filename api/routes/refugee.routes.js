const express = require("express");
const router = express.Router();

const {
    addRefugee,
    deleteRefugee,
    getRefugee,
    getAllRefugees,
    updateRefugee
} = require("../controllers/refugee.controllers");

router.post("/", addRefugee);
router.get("/refugees", getAllRefugees);
router.get("/:refugeeId", getRefugee);
router.patch("/:refugeeId", updateRefugee);
router.delete("/:refugeeId", deleteRefugee);

module.exports = router;