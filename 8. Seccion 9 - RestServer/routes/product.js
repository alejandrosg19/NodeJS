const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares/index');
const { idProductExist } = require('../helpers/db_validator');
const { 
    obtenerProductos,
    obtenerProductoById,
    crearProducto,
    actualizarProduct,
    eliminarProducto
} = require('../controllers/product');

const router = Router();


router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(idProductExist),
    validarCampos
],obtenerProductoById);

router.post('/', [
    validarJWT,
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('price', 'El precio del producto es obligatorio').not().isEmpty(),
    check('category', 'El nombre de la cateogira ed obligatoria').not().isEmpty(),
    check('description', 'La descripción del producto es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idProductExist ),
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('price', 'El precio del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción del producto es obligatorio').not().isEmpty(),
    check('category', 'La categoria del producto es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProduct);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idProductExist ),
    validarCampos
], eliminarProducto);

module.exports = router;