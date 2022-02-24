const validarCampos   = require('../middlewares/validar_campos');
const validarJWT      = require('../middlewares/validar_jwt');
const validarRole     = require('../middlewares/validar_role');
const validarArchivos = require('../middlewares/validar_archivos');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRole,
    ...validarArchivos
}