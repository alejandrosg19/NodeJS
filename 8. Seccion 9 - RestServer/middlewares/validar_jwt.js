const { response, request} = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async (req = request, res = response, next ) => {
    
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPUBLICKEY);
        
        const user = await User.findById( uid );

        if( !user ){
            res.status(401).json({
                "msg": "Token no valido - Usuario no se en cuentra registrado en la db"
            })
        }

        if( !user.state ){
            res.status(401).json({
                "msg": "Token no valido - Usuario no esta activo"
            })
        }

        req.user = user;

        next();   

    } catch (error) {
        console.log("Error", error);
        res.status(401).json({
            msg: "Token no valido"
        });
    }
}

module.exports = {
    validarJWT
}