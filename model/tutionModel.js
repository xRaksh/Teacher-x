const mongoose = require('mongoose');

const tutionSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    uniqueID: {
        type: String,
        required: true
    }
}, { timestamps: true });

const tutionModel = mongoose.model('tutionModel', tutionSchema);
module.exports = tutionModel;
