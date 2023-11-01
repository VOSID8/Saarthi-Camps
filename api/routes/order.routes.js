const express = require("express");
const router = express.Router();

const {
    orderMedicines,
    getAllOrders,
    getAllOrdersOfRefugee,
    getAnOrder,
} = require("../controllers/order.controllers");

router.post("/:refugeeId", orderMedicines);
router.get("/orders", getAllOrders);
router.get("/refugee/:refugeeId", getAllOrdersOfRefugee);
router.get("/:orderId", getAnOrder);

module.exports = router;