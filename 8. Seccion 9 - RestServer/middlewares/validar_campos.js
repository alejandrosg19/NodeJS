const { validationResult } =  require('express-validator');

const validarCampos = ( req, res, next) => {
    //Aqui llegan todos los errores de los anteriores Middlewares
    const errors = validationResult(req);
    //isEmpy valida si esta vacio
    if(!errors.isEmpty()) return res.status(400).json(errors);

    next();
}

module.exports = {
    validarCampos
}