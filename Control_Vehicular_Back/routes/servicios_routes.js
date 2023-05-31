const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_seguros, get_seguros,get_busqueda, put_seguros, delete_seguros } = require('../controllers/servicios_controller.js');

router.post('/',
    body('idVehiculo').exists().notEmpty().isString(),
    body('descripcion').exists().notEmpty().isString(),
    body('fecha_Hora').exists().notEmpty().isString(),
    body('observaciones').exists().isString(),
    post_seguros);

router.get('/', get_seguros);

router.get('/:idServicio',
    param('idServicio').exists().notEmpty().isString(),
    get_busqueda);

router.put('/',
    body('idServicio').exists().notEmpty().isString(),
    body('idVehiculo').exists().notEmpty().isString(),
    body('descripcion').exists().notEmpty().isString(),
    body('fecha_Hora').exists().notEmpty().isString(),
    body('observaciones').exists().isString(),
    put_seguros);

router.delete('/:idServicio',
    param('idServicio').exists().notEmpty().isNumeric(),
    delete_seguros);

module.exports = router