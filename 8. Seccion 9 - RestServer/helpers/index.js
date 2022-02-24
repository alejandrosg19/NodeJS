const dbValidator  = require('./db_validator');
const generarJWT   = require('./generar_jwt');
const googleVerify = require('./google_verify');
const subirArchivo = require('./subir_archivo');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}