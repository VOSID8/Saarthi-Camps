const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
    autoInc: {
        type: String,
    },
    seqVal: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Counter", counterSchema);