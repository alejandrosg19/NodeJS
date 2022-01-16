const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require("../models/user");

const userGet = async ( req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true};
    
    //Primero se ejecuta una consulta y luego otra.
    // const totalUsers = await User.find( query )
    //     .skip( Number(desde) )
    //     .limit( Number(limite) );
    // const total = await User.countDocuments( query );

    //Se ejecutan ambas consultas al tiempo.
    const [ total, totalUsers ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        totalUsers
    });
}

const userPost = async ( req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);
    //Guardar en DB
    await user.save();

    res.json({
        user
    });
}

const userPut = async ( req = request, res = response) => {
    const { id } = req.params;
    const { password, google, correo, ...others} = req.body;

    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await User.findByIdAndUpdate( id, others );

    res.json(usuario);
}

const userDelete = async( req = request, res = response) => {
    const { id } = req.params;

    //Eliminando dato directamente de la db
    // const user = await User.findByIdAndDelete(id);

    //Actualización
    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json( user );
}

const userPatch = ( req = request, res = response) => {
    res.json({
        msg: "patch API"
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}