const path = require('path');
const fs   = require('fs');

const { response } = require('express');
const { validarTipoArchivo } = require('../helpers');

const { User, Product } = require('../models');


const cargarArchivo = async(req, res = response) => {

    try {
        
        // txt, md
        // const nombre = await validarTipoArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await validarTipoArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const actualizarImagen = async(req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un User con el id ${ id }`
                });
            }
        
        break;

        case 'product':
            modelo = await Product.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un Product con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto - actualizarImagen'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await validarTipoArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();


    res.json( modelo );

}


module.exports = {
    cargarArchivo,
    actualizarImagen
}