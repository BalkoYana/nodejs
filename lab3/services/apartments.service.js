
const apartmentModel = require('../models/apartment.model.js');


async function create(apartment) {
    return apartmentModel.create(apartment);
}

async function find({ searchString = '', page = 1, perPage = 20 }) {
    const filter = {
        district: { $regex: `^${searchString}`, $options: 'i' }
    }


    return {
        items: await apartmentModel.find({}).skip((page - 1) * perPage).limit(Number(perPage)),
        count: await apartmentModel.countDocuments(filter),
    }
}

async function findById(id) {
    return apartmentModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return apartmentModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
};

async function findByIdAndDelete(id) {
    return apartmentModel.findByIdAndDelete(id)
};

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
};