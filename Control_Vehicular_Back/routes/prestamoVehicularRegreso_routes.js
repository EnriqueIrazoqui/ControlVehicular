const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_PrestamoVehicularRegreso, get_PrestamoVehicularRegreso, get_busqueda, put_PrestamoVehicularRegreso, delete_PrestamoVehicularRegreso } = require('../controllers/prestamoVehicularRegreso_controller.js');

router.post('/',
    body('idSalida').exists().notEmpty().isNumeric().not().isString(),
    body('idSupervisor').exists().notEmpty().isString(),
    body('idUsuario').exists().notEmpty().isString(),
    body('idVehiculo').exists().notEmpty().isNumeric().not().isString(),
    body('kilometraje').exists().notEmpty().isString(),
    body('descripcionDanos').exists().notEmpty().isString(),
    body('tapetes').exists().notEmpty().isNumeric().not().isString(),
    body('llantasDeRefaccion').exists().notEmpty().isNumeric().not().isString(),
    body('gatoHidraulico').exists().notEmpty().isNumeric().not().isString(),
    body('extras').exists().isString(),
    body('nivelDeCombustible').exists().notEmpty().isString(),
    body('fechaHora').exists().notEmpty().isDate(),
    body('foto').exists().notEmpty().isString(),
    post_PrestamoVehicularRegreso);

router.get('/', get_PrestamoVehicularRegreso);

router.get('/:placas',
    param('placas').exists().notEmpty().isString(),
    get_busqueda);

router.put('/',
    body('id').exists().notEmpty().isNumeric().not().isString(),
    body('idSalida').exists().notEmpty().isNumeric().not().isString(),
    body('idSupervisor').exists().notEmpty().isString(),
    body('idUsuario').exists().notEmpty().isString(),
    body('idVehiculo').exists().notEmpty().isNumeric().not().isString(),
    body('kilometraje').exists().notEmpty().isString(),
    body('descripcionDanos').exists().notEmpty().isString(),
    body('tapetes').exists().notEmpty().isNumeric().not().isString(),
    body('llantasDeRefaccion').exists().notEmpty().isNumeric().not().isString(),
    body('gatoHidraulico').exists().notEmpty().isNumeric().not().isString(),
    body('extras').exists().isString(),
    body('nivelDeCombustible').exists().notEmpty().isString(),
    body('fechaHora').exists().notEmpty().isDate(),
    body('foto').exists().notEmpty().isString(),
    put_PrestamoVehicularRegreso);

router.delete('/:id',
    param('id').exists().notEmpty().isNumeric(),
    delete_PrestamoVehicularRegreso);

module.exports = router