const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_refrendos, get_refrendos,get_busqueda, put_refrendos, delete_refrendos } = require('../controllers/refrendos_controller.js');

router.post('/',
    body('idVehiculo').exists().notEmpty().isString(),
    body('monto').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isString(),
    body('fechaVencimiento').exists().notEmpty().isString(),
    post_refrendos);

router.get('/', get_refrendos);

router.get('/:placas',
    param('placas').exists().notEmpty().isString(),
    get_busqueda);

router.put('/',
    body('idRefrendo').exists().notEmpty().isString(),
    body('monto').exists().notEmpty().isString(),
    body('fechaInicio').exists().notEmpty().isString(),
    body('fechaVencimiento').exists().notEmpty().isString(),
    put_refrendos);

router.delete('/:idRefrendo',
    param('idRefrendo').exists().notEmpty().isNumeric(),
    delete_refrendos);

module.exports = router