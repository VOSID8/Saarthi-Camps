const Order = require("../models/order.models");
const Counter = require("../models/counter.models");
const asyncHandler = require("express-async-handler");
const kafkaSend = require("../services/kafkaUtils");

const orderMedicines = asyncHandler(async (req, res) => {
    const { medicineName, refugeeId } = req.body;
    if (!medicineName || !refugeeId) {
        res.status(400);
        throw new Error("Medicine name is a required field");
    }

    // generate order id
    try {
        const orderInc = await Counter.findOne({ autoInc: "orderInc" });
        orderInc.seqVal += 1;
        await orderInc.save();
        req.body.orderId = orderInc.seqVal;
    } catch (e) {
        const orderInc = await Counter.create({ autoInc: "orderInc" });
        req.body.orderId = orderInc.seqVal;
    }

    const newOrder = await Order.create(req.body);
    await kafkaSend(newOrder.refugeeId, newOrder.medicineName, newOrder.medicineQuantity, newOrder.medicineUrgency);
    res.json(newOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await Order.find();
    res.json(allOrders);
});

const getAllOrdersOfRefugee = asyncHandler(async (req, res) => {
    const { refugeeId } = req.params;
    const orders = await Order.find({ refugeeId });
    res.json(orders);
});

const getAnOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.find({ orderId });
    res.json(order);
});

module.exports = {
    orderMedicines,
    getAllOrders,
    getAllOrdersOfRefugee,
    getAnOrder,
}