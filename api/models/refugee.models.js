const mongoose = require("mongoose");

const refugeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    refugeeId: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: true,
    }
}, { timestamps: true });

refugeeSchema.methods.toJSON = function () {
    const refueeObject = this.toObject();

    delete refueeObject._id;
    delete refueeObject.__v;
    delete refueeObject.imageURL;
    return refueeObject;
}

module.exports = mongoose.model("Refugee", refugeeSchema);