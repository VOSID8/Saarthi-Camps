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
    //Filter
    const filterObj = { ...req.query };
    const excludeFromFilter = ['sort', 'fields', 'page', 'limit'];

    excludeFromFilter.forEach((query) => {
        delete filterObj[query];
    });
    if(!isNaN(filterObj['medicineQuantity'])){
        filterObj['medicineQuantity'] = parseInt(filterObj['medicineQuantity']);
    }
    if(!isNaN(filterObj['medicineUrgency'])){
        filterObj['medicineUrgency'] = parseInt(filterObj['medicineUrgency']);
    }
    let query = Order.find(filterObj);

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("createdAt");
    }

    //Fields 
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }

    //Page and limit
    const page = req.query.page;
    let limit = req.query.limit;
    if (!limit) limit = 20;

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
        const ordersCount = await Order.countDocuments();
        if (skip >= ordersCount) throw new Error("This page doesn't exist");
    }
    const orders = await query;
    res.json(orders);
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