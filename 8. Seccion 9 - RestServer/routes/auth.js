const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();


router.post('/login', [
    check('email', 'El correo es obligatotio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('google_token', 'google_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn )

module.exports = router