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
function calculateAverage(req, res, next) {
    try {
        const { area, rooms } = req.body;



        if (!area || !rooms) {
            throw createError.BadRequest("area and rooms are required fields");
        }

        const aver = area / rooms;


        res.locals.aver = aver;
        res.json({
            apartment: req.body,
            aver: aver
        });

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
                { owner: req.body.owner },

            ]

        });

        if (apartment) {
            throw createError.BadRequest("apartment with such owner already exist");
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
        if (req.body.owner) {
            const orExpression = [];
            if (req.body.owner) {
                orExpression.push({ owner: req.body.owner });

            }

            const apartment = await apartmentService.findOne({
                _id: {
                    $ne: req.params.apartmentId
                },
                $or: orExpression
            });

            if (apartment) {
                throw createError.BadRequest("apartment with such owner already exist");
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
    apartmentUpdateValidation,
    calculateAverage
};