const Refugee = require("../models/refugee.models");
const Counter = require("../models/counter.models");
const asyncHandler = require("express-async-handler");

const addRefugee = asyncHandler(async (req, res) => {
    const { name, gender, dob } = req.body;
    if (!name || !gender || !dob) {
        res.status(400);
        throw new Error("Name, Gender and Date of Birth are required fields");
    }

    //generate refugee id
    try {
        const counter = await Counter.findOne({ autoInc: "refugeeInc" });
        counter.seqVal += 1;
        await counter.save();
        req.body.refugeeId = process.env.CAMP_ID + counter.seqVal;
    } catch (e) {
        const counter = await Counter.create({ autoInc: "refugeeInc" });
        req.body.refugeeId = process.env.CAMP_ID + counter.seqVal;
    }

    const newRefugee = await Refugee.create(req.body);
    res.json(newRefugee);
});

const deleteRefugee = asyncHandler(async (req, res) => {
    const refugeeId = req.params.refugeeId;
    const refugee = await Refugee.findOneAndDelete({ refugeeId });
    res.json(refugee);
});

const getRefugee = asyncHandler(async (req, res) => {
    const { refugeeId } = req.params;
    const refugee = await Refugee.findOne({ refugeeId });
    if(!refugee){
        res.status(404);
        throw new Error("No refugee found with specified id");
    }
    res.json(refugee);
});

const getAllRefugees = asyncHandler(async (req, res) => {
    const refugees = await Refugee.find();
    res.json(refugees);
});

const updateRefugee = asyncHandler(async (req, res) => {
    const refugeeId = req.params.refugeeId;
    const updateFields = Object.keys(req.body);

    const refugee = await Refugee.findOne({ refugeeId });
    updateFields.forEach((update) => {
        if (update != refugeeId) {
            refugee[update] = req.body[update];
        }
    });
    await refugee.save();
    res.json(refugee);
});

module.exports = {
    addRefugee,
    deleteRefugee,
    getRefugee,
    getAllRefugees,
    updateRefugee
}