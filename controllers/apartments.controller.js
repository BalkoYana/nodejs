const apartmentService = require('../services/apartments.service');
const createError = require('http-errors');

async function createApartment(req, res, next) {
    try {
        const newApartment = await apartmentService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newApartment,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function getApartments(req, res, next) {
    try {
        res.status(200).json({
            status: 200,
            data: await apartmentService.find(req.query),
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function getApartment(req, res, next) {
    try {
        const { apartmentId } = req.params;
        const apartment = await apartmentService.findById(apartmentId);

        if (!apartment) {
            return res.status(400).json({
                status: 400,
                error: {
                    message: 'apartment not found.'
                },
            });
        }

        res.status(200).json({
            status: 200,
            data: apartment,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function updateApartment(req, res) {
    try {
        const { apartmentId } = req.params;
        const apartmentData = req.body;
        await apartmentService.findByIdAndUpdate(apartmentId, apartmentData);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function deleteApartment(req, res) {
    try {
        const { apartmentId } = req.params;
        await apartmentService.findByIdAndDelete(apartmentId);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

module.exports = {
    createApartment,
    getApartments,
    getApartment,
    updateApartment,
    deleteApartment,
};