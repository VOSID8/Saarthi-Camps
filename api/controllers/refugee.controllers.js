const Refugee = require("../models/refugee.models");
const Counter = require("../models/counter.models");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../services/cloudinary");

const addRefugee = asyncHandler(async (req, res) => {
    console.log(req.body)
    const image = req.files?.image;
    console.log(image)
    if (image) {
        try {
            const result = await cloudinary.v2.uploader.upload(image.tempFilePath)
            req.body.imageURL = result.url;
            console.log(req.body.imageURL)
        } catch (e) {
            throw new Error(e);
        }
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
    if (!refugee) {
        res.status(404);
        throw new Error("No refugee found with specified id");
    }
    res.json(refugee);
});

const getAllRefugees = asyncHandler(async (req, res) => {
    //Filter
    const filterObj = { ...req.query };
    const excludeFromFilter = ['sort', 'fields', 'page', 'limit'];
    excludeFromFilter.forEach((query) => {
        delete filterObj[query];
    });
    let query = Refugee.find(filterObj);

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
        const refugeesCount = await Refugee.countDocuments();
        if (skip >= refugeesCount) throw new Error("This page does not exist");
    }

    const refugees = await query;
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

const getImageOfRefugee = asyncHandler(async (req, res) => {
    const { refugeeId } = req.params;
    const { imageURL } = await Refugee.findOne({ refugeeId });
    res.send(imageURL);
});

module.exports = {
    addRefugee,
    deleteRefugee,
    getRefugee,
    getAllRefugees,
    updateRefugee,
    getImageOfRefugee
}