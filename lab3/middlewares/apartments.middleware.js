const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const apartmentService = require('../services/apartments.service');

async function apartmentByIdValidation(req, res, next) {
    try {
        const { apartmentId } = req.params;

        if (!ObjectId.isValid(apartmentId)) {
            throw createError.BadRequest("apartment id is not valid");
        }

        const apartment = await apartmentService.findById(apartmentId);

        if (!apartment) {
            throw createError.NotFound("apartment with such id not found");
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    apartmentByIdValidation,
};