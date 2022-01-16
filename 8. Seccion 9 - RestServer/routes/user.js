const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { 
    roleValidate ,
    emailExist,
    idExist
} = require('../helpers/db_validator');

const {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
} = require('../controllers/user');

const router = Router();


router.get('/', userGet)
//Si la ruta tiene tres valores, significa que en el segundo valor tiene un middleware. Estos almacenan los errores en la request de la petición
//Por lo tendremos que validar esos errores en el controlador
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser de min 6 caracteres').isLength({ min:6 }),
    check('email').custom( emailExist ).isEmail(),
    //custom, forma de realizar validación a un campo personalizadamente.
    check('role').custom( roleValidate ),
    //Middlewares personalizado, todos los demas errores anteriores de chech se van al req de esta función
    validarCampos
], userPost)

//Tambien se pueden validar los parametros enviados directamente en la URL
router.put('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idExist ),
    check('rol').custom( roleValidate ),
    validarCampos
], userPut)
router.delete('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( idExist ),
    validarCampos
] ,userDelete)
router.patch('/', userPatch)

module.exports = router;