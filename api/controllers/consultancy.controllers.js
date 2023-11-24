const Consultancy = require("../models/consultancy.models");
const User = require("../models/user.models");
const Counter = require("../models/counter.models");
const asyncHandler = require("express-async-handler");
const { sendVideoCallEmail } = require("../services/emailUtils");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const postConsultancy = asyncHandler(async (req, res) => {
    const { service, refugeeId } = req.body;
    if (!service || !refugeeId) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    // generate consultancy id
    try {
        const consultancyInc = await Counter.findOne({ autoInc: "consultancyInc" });
        consultancyInc.seqVal += 1;
        await consultancyInc.save();
        req.body.consultancyId = consultancyInc.seqVal;
    } catch (e) {
        const consultancyInc = await Counter.create({ autoInc: "consultancyInc" });
        req.body.consultancyId = consultancyInc.seqVal;
    }

    const consultancy = await Consultancy.create(req.body);
    //console.log(consultancy.service)
    const doctor = await User.findOne({ specialization: consultancy.service })
    //console.log(doctor)
    //generate video call token

    // Define your Agora App ID and App Certificate (you can get these from the Agora Dashboard)
    const APP_ID = process.env.APP_ID
    const APP_CERTIFICATE = process.env.APP_CERTIFICATE
    // Define your channel name and user ID
    // const channelName = consultancy.refugeeId;
    const channelName = consultancy.refugeeId;
    const uid = 123456; // Replace with your user ID or leave it as 0 for temporary token

    // Set expiration time in seconds (default is 3600 seconds / 1 hour)
    const expirationTimeInSeconds = 3600;

    // Generate an Agora token
    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        RtcRole.ROLE_PUBLISHER, // Change the role based on your requirements
        expirationTimeInSeconds
    );

    console.log('Generated Token:', token);
    const tokens = token.split('/')
    const token1 = tokens[0];
    const token2 = tokens[1];

    sendVideoCallEmail(doctor.email, channelName, token1, token2);
    const link = `http://localhost:3001/${channelName}/${token1}/${token2}`
    res.json(link);
});

module.exports = {
    postConsultancy,
}