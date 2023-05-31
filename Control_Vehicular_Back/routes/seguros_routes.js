const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_seguros, get_seguros, put_seguros, delete_seguros } = require('../controllers/seguros_controller.js');

router.post('/',
    body('idVehiculo').exists().notEmpty().isString(),
    body('numeroSeguro').exists().notEmpty().isString(),
    body('nombreAseguradora').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isString(),
    body('fechaVencimiento').exists().notEmpty().isString(),
    post_seguros);

router.get('/', get_seguros);

router.put('/',
    body('idSeguro').exists().notEmpty().isString(),
    body('numeroSeguro').exists().notEmpty().isString(),
    body('nombreAseguradora').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isString(),
    body('fechaVencimiento').exists().notEmpty().isString(),
    put_seguros);

router.delete('/:idSeguro',
    param('idSeguro').exists().notEmpty().isNumeric(),
    delete_seguros);

module.exports = router