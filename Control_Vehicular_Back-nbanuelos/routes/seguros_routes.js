const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_seguros, get_seguros,get_seguro,get_busqueda, put_seguros, delete_seguros } = require('../controllers/seguros_controller.js');

router.post('/',
    body('idVehiculo').exists().notEmpty().isString(),
    body('numeroSeguro').exists().notEmpty().isString(),
    body('nombreAseguradora').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isString(),
    body('fechaVencimiento').exists().notEmpty().isString(),
    post_seguros);

router.get('/', get_seguros);

router.get('/:placas',
    param('placas').exists().notEmpty().isString(),
    get_busqueda);

router.get('/:idSeguro',
    param('idSeguro').exists().notEmpty().isString(),
    get_seguro);

router.put('/',
    body('idSeguro').exists().notEmpty().isNumeric().not().isString(),
    body('numeroSeguro').exists().notEmpty().isString(),
    body('nombreAseguradora').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isDate(),
    body('fechaVencimiento').exists().notEmpty().isDate(),
    put_seguros);

router.delete('/:idSeguro',
    param('idSeguro').exists().notEmpty().isNumeric(),
    delete_seguros);

module.exports = router