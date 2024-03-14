const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const apartmentService = require('../services/apartments.service');
const { ApartmentCreateSchema, ApartmentUpdateSchema } = require('../validation_schemas/apartments.schemas');

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
const apartmentCreateValidation = async (req, res, next) => {
    try {
        const { error } = ApartmentCreateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }
        const apartment = await apartmentService.findOne({
            $or: [
                { district: req.body.district },
                { price: req.body.price },
            ]

        });
        if (apartment) {
            throw createError.BadRequest("apartment with such district or price already exist");
        }
        next();
    }
    catch (err) {
        next(err);
    }
};

const apartmentUpdateValidation = async (req, res, next) => {
    try {
        const { error } = ApartmentUpdateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }
        if (req.body.district || req.body.price) {
            const orExpression = [];
            if (req.body.district) {
                orExpression.push({ district: req.body.district });

            }
            if (req.body.price) {
                orExpression.push({ price: req.body.price });
            }
            const apartment = await apartmentService.findOne({
                _id: {
                    $ne: req.params.apartmentId
                },
                $or: orExpression
            });
            if (apartment) {
                throw createError.BadRequest("apartment with such district or price already exist");
            }
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    apartmentByIdValidation,
    apartmentCreateValidation,
    apartmentUpdateValidation
};