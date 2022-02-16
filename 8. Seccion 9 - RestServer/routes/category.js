const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares/index');

const { idCategoryExist } = require('../helpers/db_validator');

const {
    obtenerCategorias,
    obtenerIdCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/category');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idCategoryExist ),
    validarCampos
], obtenerIdCategoria);

router.post('/', [
    validarJWT,
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idCategoryExist ),
    check('name', 'El nombre es obligatorio ya que es el campo a actualizar').not().isEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idCategoryExist ),
    validarCampos
], eliminarCategoria);

module.exports = router;