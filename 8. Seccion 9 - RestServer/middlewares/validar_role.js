const { request, response } = require('express');


//Como este Middleware va despues de que se valida el JWT ya el req.user posee todo la info del usuario.
const validarRoleAdmin = ( req = request, res = response, next ) =>{

    const user = req.user;

    if( !user ){
        res.status(500).json({
            "msg": "Error interno - Se esta intentado validar usuario sin antes validar JWT"
        })
    }

    if ( !user.role == "ADMIN_ROLE"){
        res.status(500).json({
            "msg": "Error interno - El rol de este usuario no tiene acceso a estas funcionalidades"
        })
    }

    next();
}


const tieneRole = ( ...roles ) =>{
    return ( req = request, res = response, next ) => {
    
        const user = req.user;

        if( !user ){
            res.status(500).json({
                "msg": "Error interno - Se esta intentado validar usuario sin antes validar JWT"
            })
        }

        if( !roles.includes( user.role ) ){
            res.status(500).json({
                "msg": `Error interno - Se require uno de estos roles ${ roles }`
            })
        }

        next();

    }
}
module.exports = { 
    validarRoleAdmin,
    tieneRole 
}