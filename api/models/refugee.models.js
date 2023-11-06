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
        default: "http://res.cloudinary.com/duhdg3btj/image/upload/v1699264322/tolia398cdxspwlnjzjn.png"
    }
}, { timestamps: true });

refugeeSchema.methods.toJSON = function () {
    const refueeObject = this.toObject();

    delete refueeObject._id;
    delete refueeObject.__v;
    return refueeObject;
}

module.exports = mongoose.model("Refugee", refugeeSchema);