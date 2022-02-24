const { request, response } = require('express');

const validarArchivoExistente = ( req = request, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ 
            msg: "No se cargo ningun archivo - validarArchivoExistente"
        });
    }

    next();
}

module.exports = {
    validarArchivoExistente
}