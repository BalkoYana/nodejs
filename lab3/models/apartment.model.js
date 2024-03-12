const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    district: {
        type: String,
        required: true,
        trim: true,
    },
    floor: {
        type: Number,
        required: true,
        trim: true,
    },
    area: {
        type: Number,
        required: true,
        trim: true,
    },
    rooms: {
        type: Number,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },



});
module.exports = model('apartment', apartmentSchema)