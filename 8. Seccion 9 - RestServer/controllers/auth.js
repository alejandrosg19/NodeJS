const { request, response, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generar_jwt');
const { googleVerify } = require('../helpers/google_verify');

const login = async( req = require, res = response) => {

    const { email, password } = req.body;

    try {

        // Validando email
        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                "msg": "Algo salio mal - email incorrecto"
            });
        }

        // Validando si esta activo
        if( !user.state ){
            return res.status(400).json({
                "msg": "Algo salio mal - usuario no activo"
            })
        }

        // Validando password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                "msg": "Algo salio mal - password incorrecta"
            });
        }

        //Generar JWT (Json web token)
        const token = await generarJWT( user.id ); 

        res.json({
            user,
            token
        })

    } catch (error) {
        
        res.status(500).json({
            'msg': 'Error algo salio mal'
        });
    }
}


// Cuando inentan registrarse en nuestra app desde google
const googleSignIn = async (req = request, res = response )=>{
    
    const { google_token } = req.body;

    try {

        const { name, picture, email } = await googleVerify( google_token );
        let user = await User.findOne( {email} );
        
        //Si el usuario a auntenticar no existe en la db
        if( !user ){
            
            const data = {
                name,
                email,
                password: "123456",
                img: picture,
                google: true
            }
            
            user = new User( data );
            await user.save();
        } 
        
        //Si el usuario a autenticar existe pero no esta activo
        if( !user.state ){
            
            json.status(401).json({
                msg: "No se puede autenticar el usuario porque no esta activo"
            });
        }
        
        //Generar JWT (Json web token) esto es para nuestra autenticación no la de google.
        //Sin el JWT no puede acceder al EndPoint de eliminar usuario, ademas tiene que se admin
        const token = await generarJWT( user.id ); 

        res.json({
            msg: "Atenticación de google correcta",
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: "El token de google sign in no se pudo autenticar",
            error
        });
    }
}
module.exports = {
    login,
    googleSignIn
}