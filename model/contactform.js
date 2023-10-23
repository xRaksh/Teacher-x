const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    message: {
        type: String,
    }
}, { timestamps: true });

const ContactModel = mongoose.model('ContactModel', contactSchema);
module.exports = ContactModel;
