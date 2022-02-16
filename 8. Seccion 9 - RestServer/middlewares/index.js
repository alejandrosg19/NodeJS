const validarCampos = require('../middlewares/validar_campos');
const validarJWT = require('../middlewares/validar_jwt');
const validarRole = require('../middlewares/validar_role');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRole
}