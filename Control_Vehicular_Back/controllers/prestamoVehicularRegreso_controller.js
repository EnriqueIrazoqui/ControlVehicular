const express = require('express');
const axios = require("axios");
const { validationResult } = require('express-validator');
const { return_error } = require('../helpers/helper');
const pool = require('../config/mariadb.js');

function buscarAdmin(id) {
    return new Promise((resolve, reject) => {
        // Hacemos una consulta GET al endpoint para obtener la información completa de la tabla "admin"
        axios.get('http://developer.tecmm.mx:3322/v1/usuario/admin')
            .then(responsee => {
                // Buscamos el id en los datos recibidos
                const admin = responsee.data.find(admin => admin.noNomina === id);
                // Si el id existe, resolvemos la promesa con la información del admin correspondiente
                if (admin) {
                    resolve(admin.noNomina);
                } else {
                    resolve(null);
                }
            })
            .catch(error => reject(error));
    });
}

function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        // Hacemos una consulta GET al endpoint para obtener la información completa de la tabla "usuario"
        axios.get('http://developer.tecmm.mx:3322/v1/usuario/usuario')
            .then(responsee => {
                // Buscamos el id en los datos recibidos
                const usuario = responsee.data.find(usuario => usuario.noNomina === id);
                // Si el id existe, resolvemos la promesa con la información del usuario correspondiente
                if (usuario) {
                    resolve(usuario.noNomina);
                } else {
                    resolve(null);
                }
            })
            .catch(error => reject(error));
    });
}

const post_PrestamoVehicularRegreso = async (req, res) => {
    const { idSalida, idSupervisor, idUsuario, idVehiculo, kilometraje, descripcionDanos, tapetes, llantasDeRefaccion, gatoHidraulico, extras, nivelDeCombustible, fechaHora, foto } = req.body;
    console.log(idSalida, idSupervisor, idUsuario, idVehiculo, kilometraje, descripcionDanos, tapetes, llantasDeRefaccion, gatoHidraulico, extras, nivelDeCombustible, fechaHora, foto);
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
        const response = return_error(401, 'datos con formato incorrecto');
        return res.status(401).json(response);
    }

    await pool.getConnection().then(async (conn) => {
        const data = [idSalida, idSupervisor.toUpperCase(), idUsuario.toUpperCase(), idVehiculo, kilometraje.toUpperCase(), descripcionDanos.toUpperCase(), tapetes, llantasDeRefaccion, gatoHidraulico, extras.toUpperCase(), nivelDeCombustible.toUpperCase(), fechaHora, foto]
        try {
            const valor = await buscarAdmin(idSupervisor);
            const valor2 = await buscarUsuario(idUsuario);
            if (valor === null) {
                const error = return_error(406, "El supervisor no existe");
                return res.status(406).json(error);
            }
            if (valor2 === null) {
                const error = return_error(406, "El usuario no existe");
                return res.status(406).json(error);
            }
            const validacion_clave = await conn.query('SELECT count(id) as result FROM PrestamoVehiculoSalida WHERE id = ?', idSalida);
            if (parseInt(validacion_clave[0].result) === 0) {
                const error = return_error(406, "El prestamo vehicular de salida no existe");
                return res.status(406).json(error);
            }
            const validacion_clave2 = await conn.query('SELECT count(idVehiculo) as result FROM Vehiculo WHERE idVehiculo = ?', idVehiculo);
            if (parseInt(validacion_clave2[0].result) === 0) {
                const error = return_error(406, "El vehiculo no existe");
                return res.status(406).json(error);
            }

            const query = await conn.query("INSERT INTO PrestamoVehiculoRegreso(idSalida, idSupervisor, idUsuario, idVehiculo, kilometraje, descripcionDanos, tapetes, llantasDeRefaccion, gatoHidraulico, extras, nivelDeCombustible, fechaHora, foto) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", data);
            console.log(query);

            const id = await conn.query('SELECT MAX(id) as ID FROM PrestamoVehiculoRegreso');

            res.status(200).json({
                'ok': true,
                'idVehiculo': id[0].ID,
                'mensaje': {
                    'statusCode': 200,
                    'menssageText': 'El registro fue con exito'
                }
            })
            conn.end();
        } catch (error) {
            res.status(500).json({
                "ok": false,
                "message": {
                    "statusCode": 500,
                    "messageText": "internal server error"
                }
            })
            conn.end();
        }
    });
}

const get_PrestamoVehicularRegreso = async (req, res) => {
    await pool.getConnection().then(async (conn) => {
        try {
            const query = await conn.query("SELECT p.id, v.marca, v.modelo, v.placas, p.idSupervisor, p.idUsuario, p.kilometraje, p.descripcionDanos, p.tapetes, p.llantasDeRefaccion, p.gatoHidraulico, p.extras, p.nivelDeCombustible, p.fechaHora, p.foto FROM PrestamoVehiculoRegreso AS p INNER JOIN Vehiculo v ON p.idVehiculo = v.idVehiculo");

            res.json(query);
            conn.end();
        } catch (error) {
            res.status(500).json({
                "ok": false,
                "message": {
                    "statusCode": 500,
                    "messageText": "internal server error"
                }
            })
            conn.end();
        }
    });
}

const get_busqueda = async (req, res) => {
    const {placas} = req.params;

    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
        const response = return_error(401, 'datos con formato incorrecto');
        return res.status(401).json(response);
    }

    await pool.getConnection().then( async (conn) => {
        try{
            const validacion_clave = await conn.query('SELECT count(placas) as result FROM Vehiculo WHERE placas = ?', placas);
            if(parseInt(validacion_clave[0].result) === 0){
                const error = return_error(406, "El vehiculo no existe");
                return res.status(406).json(error);
            }
            const query = await conn.query("SELECT idSalida, p.id, v.marca, v.modelo, v.placas, v.idVehiculo, p.idSupervisor, p.idUsuario, p.kilometraje, p.descripcionDanos, p.tapetes, p.llantasDeRefaccion, p.gatoHidraulico, p.extras, p.nivelDeCombustible, p.fechaHora, p.foto FROM PrestamoVehiculoRegreso AS p INNER JOIN Vehiculo v ON p.idVehiculo = v.idVehiculo WHERE v.placas = ?", placas);
            console.log(query);

            res.json(query);
            conn.end();
        }catch(error){
            res.status(500).json({
                "ok": false,
                "message": {
                    "statusCode": 500,
                    "messageText": "internal server error"
                }
            })
            conn.end();
        }
    });
}

const put_PrestamoVehicularRegreso = async (req, res) => {
    const { id, idSalida, idSupervisor, idUsuario, idVehiculo, kilometraje, descripcionDanos, tapetes, llantasDeRefaccion, gatoHidraulico, extras, nivelDeCombustible, fechaHora, foto } = req.body;

    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
        const response = return_error(401, 'datos con formato incorrecto');
        return res.status(401).json(response);
    }

    await pool.getConnection().then(async (conn) => {
        const data = [idSalida, idSupervisor, idUsuario, idVehiculo, kilometraje, descripcionDanos, tapetes, llantasDeRefaccion, gatoHidraulico, extras, nivelDeCombustible, fechaHora, foto, id]
        try {
            const validacion_clave2 = await conn.query('SELECT count(id) as result FROM PrestamoVehiculoRegreso WHERE id = ?', id);
            if (parseInt(validacion_clave2[0].result) === 0) {
                const error = return_error(406, "El prestamo no existe");
                return res.status(406).json(error);
            }
            const valor = await buscarAdmin(idSupervisor);
            const valor2 = await buscarUsuario(idUsuario);
            if (valor === null) {
                const error = return_error(406, "El supervisor no existe");
                return res.status(406).json(error);
            }
            if (valor2 === null) {
                const error = return_error(406, "El usuario no existe");
                return res.status(406).json(error);
            }
            const validacion_clave = await conn.query('SELECT count(idVehiculo) as result FROM Vehiculo WHERE idVehiculo = ?', idVehiculo);
            if (parseInt(validacion_clave[0].result) === 0) {
                const error = return_error(406, "El vehiculo no existe");
                return res.status(406).json(error);
            }
            const validacion_clave3 = await conn.query('SELECT count(id) as result FROM PrestamoVehiculoSalida WHERE id = ?', idSalida);
            if (parseInt(validacion_clave3[0].result) === 0) {
                const error = return_error(406, "El prestamo vehicular de salida no existe");
                return res.status(406).json(error);
            }

            const query = await conn.query("UPDATE PrestamoVehiculoRegreso SET idSalida = ?, idSupervisor = ?, idUsuario = ?, idVehiculo = ?, kilometraje = ?, descripcionDanos = ?, tapetes = ?, llantasDeRefaccion = ?, gatoHidraulico = ?, extras = ?, nivelDeCombustible = ?, fechaHora = ?, foto = ? WHERE id = ?", data);
            console.log(query);

            res.status(200).json({
                'ok': true,
                'mensaje': {
                    'statusCode': 200,
                    'menssageText': 'El prestamo vehicular fue actualizado con exito'
                }
            })
            conn.end();
        } catch (error) {
            res.status(500).json({
                "ok": false,
                "message": {
                    "statusCode": 500,
                    "messageText": "internal server error"
                }
            })
            conn.end();
        }
    });
}

const delete_PrestamoVehicularRegreso = async (req, res) => {
    const { id } = req.params;

    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
        const response = return_error(401, 'datos con formato incorrecto');
        return res.status(401).json(response);
    }

    await pool.getConnection().then(async (conn) => {
        try {
            const validacion_clave = await conn.query('SELECT count(id) as result FROM PrestamoVehiculoRegreso WHERE id = ?', id);
            if (parseInt(validacion_clave[0].result) === 0) {
                const error = return_error(406, "El prestamo vehicular no existe");
                return res.status(406).json(error);
            }
            const query = await conn.query("DELETE FROM PrestamoVehiculoRegreso WHERE id = ?", id);
            console.log(query);

            res.status(200).json({
                'ok': true,
                'mensaje': {
                    'statusCode': 200,
                    'menssageText': 'El prestamo vehicular fue eliminado con exito'
                }
            })
            conn.end();
        } catch (error) {
            res.status(500).json({
                "ok": false,
                "message": {
                    "statusCode": 500,
                    "messageText": "internal server error"
                }
            })
            conn.end();
        }
    });
}

module.exports = {
    post_PrestamoVehicularRegreso,
    get_PrestamoVehicularRegreso,
    get_busqueda,
    put_PrestamoVehicularRegreso,
    delete_PrestamoVehicularRegreso
}