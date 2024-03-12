const express = require('express');
const router = express.Router();

const controller = require('../controllers/apartments.controller');
const middleware = require('../middlewares/apartments.middleware');

router.route('/')
    .get(controller.getApartments)
    .post(controller.createApartment);

router.route('/:apartmentId')
    .get(middleware.apartmentByIdValidation, controller.getApartment)
    .put(middleware.apartmentByIdValidation, controller.updateApartment)
    .patch(middleware.apartmentByIdValidation, controller.updateApartment)
    .delete(middleware.apartmentByIdValidation, controller.deleteApartment);

module.exports = router;