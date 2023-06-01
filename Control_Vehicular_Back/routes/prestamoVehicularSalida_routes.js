const express = require('express');
const router = express.Router();

const { body, param } = require("express-validator");

const { post_PrestamoVehicularSalida, get_PrestamoVehicularSalida, get_busqueda, put_PrestamoVehicularSalida, delete_PrestamoVehicularSalida } = require('../controllers/prestamoVehicularSalida_controller.js');

router.post('/',
    body('idSupervisor').exists().notEmpty().isString(),
    body('idUsuario').exists().notEmpty().isString(),
    body('idVehiculo').exists().notEmpty().isString(),
    body('kilometraje').exists().notEmpty().isString(),
    body('descripcionDanos').exists().notEmpty().isString(),
    body('tapetes').exists().notEmpty().isString(),
    body('llantasDeRefaccion').exists().notEmpty().isString(),
    body('gatoHidraulico').exists().notEmpty().isString(),
    body('extras').exists().isString(),
    body('nivelDeCombustible').exists().notEmpty().isString(),
    body('fechaHora').exists().notEmpty().isString(),
    body('foto').exists().notEmpty().isString(),
    post_PrestamoVehicularSalida);

router.get('/', get_PrestamoVehicularSalida);

router.get('/:placas',
    param('placas').exists().notEmpty().isString(),
    get_busqueda);

router.put('/',
    body('id').exists().notEmpty().isString(),
    body('idSupervisor').exists().notEmpty().isString(),
    body('idUsuario').exists().notEmpty().isString(),
    body('idVehiculo').exists().notEmpty().isString(),
    body('kilometraje').exists().notEmpty().isString(),
    body('descripcionDanos').exists().notEmpty().isString(),
    body('tapetes').exists().notEmpty().isString(),
    body('llantasDeRefaccion').exists().notEmpty().isString(),
    body('gatoHidraulico').exists().notEmpty().isString(),
    body('extras').exists().isString(),
    body('nivelDeCombustible').exists().notEmpty().isString(),
    body('fechaHora').exists().notEmpty().isString(),
    body('foto').exists().notEmpty().isString(),
    put_PrestamoVehicularSalida);

router.delete('/:id',
    param('id').exists().notEmpty().isNumeric(),
    delete_PrestamoVehicularSalida);

module.exports = router