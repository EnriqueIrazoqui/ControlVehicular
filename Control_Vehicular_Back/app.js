const express = require("express");
const app = express();
const multer = require('multer');
require("dotenv").config();

app.listen(process.env.NODE_PORT, () => {
    console.log("server running " + process.env.NODE_PORT);
});

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Configuración de Multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ruta/para/almacenar/imagenes');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Middleware de Multer para subir la imagen
const upload = multer({ storage: storage }).single('foto');

app.use('/automovil', require('./routes/automovil_routes'));
app.use('/refrendos', require('./routes/refrendos_routes'));
app.use('/seguros', require('./routes/seguros_routes'));
app.use('/servicios', require('./routes/servicios_routes'));
app.use('/verificaciones', require('./routes/verificaciones_routes'));
app.use('/prestamoVehicularSalida', upload,require('./routes/prestamoVehicularSalida_routes'));
app.use('/prestamoVehicularRegreso', require('./routes/prestamoVehicularRegreso_routes'));