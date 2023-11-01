const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    medicineName: {
        type: String,
        trim: true,
        required: true,
    },
    medicineQuantity: {
        type: Number,
        required: true,
        default: 1,
        validate: {
            validator: function(value){
                return value >= 1
            }, 
            message: "Quantity must be greater than 0"
        }
    },
    medicineUrgency: {
        type: String,
        required: true,
        enum: ["low", "normal", "high"],
        default: "normal"
    },
    refugeeId: {
        type: String,
        ref: "Refugee",
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["PROCESSING", "PROCESSED", "READY TO DISPATCH", "DISPATCHED", "DELIVERED"],
        default: "PROCESSING"
    }
});

orderSchema.methods.toJSON = function(){
    const orderOject = this.toObject();

    delete orderOject._id;
    delete orderOject.__v;
    return orderOject;
}

module.exports = mongoose.model("Order", orderSchema);