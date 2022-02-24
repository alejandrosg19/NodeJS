const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoExistente } = require('../middlewares');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();


router.post( '/', validarArchivoExistente, cargarArchivo ); 

router.put('/:coleccion/:id', [
    validarArchivoExistente,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['user','product'] ) ),
    validarCampos
], actualizarImagen )


module.exports = router;