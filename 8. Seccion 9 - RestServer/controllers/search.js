const { request, response, query } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Product, Category } = require('../models');

const coleccionesPermitidas = [
    "user",
    "category",
    "product",
    "role"
]

const buscarUsuarios= async ( termino = '', res ) => {
    const isIdMongo = ObjectId.isValid( termino );

    if ( isIdMongo ){
        const users = await User.findById( termino );
 
        return res.json({
            results: ( users ) ? [ users ] : []
        })
    }

    // Expresión regular para que no valide si el termno viene minuscula o mayuscula
    const regex = new RegExp( termino, 'i' );

    const query = {
        $or: [ { name: regex }, { email: regex }],
        $and: [ { state: true }]
    }

    const [ totalUsers, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
    ]);

    res.json({
        results: {
            totalUsers,
            users
        }
    })
}

const buscarCategorias = async ( termino = '', res ) => {
    const isMongoId = ObjectId.isValid( termino );

    if( isMongoId ){
        const categoria = await Category.findById( termino );

        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categoria = await Category.find({ name: regex , state: true })

    res.json({
        results: categoria
    })
}

const buscarProductos = async ( termino = '', res ) => {
    const isMongoId = ObjectId.isValid( termino );

    if( isMongoId ){
        const product = await Product.findById( termino )
                        .populate( 'category', 'name');

        return res.json({
            results: ( product ) ? product : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Product.find({ name: regex, state: true })
                        .populate( 'category', 'name');

    res.json({
        results: productos
    });
}

const search = ( req = request, res = response ) => {
    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg:  `Solo se aceptan las siguiente coleccions ${ coleccionesPermitidas } `
        })
    }

    switch( coleccion ){
        case "user":
            buscarUsuarios( termino, res );
        break;
        case "category":
            buscarCategorias(termino, res );
        break;
        case "product":
            buscarProductos( termino, res );
        break;
        default:
            return res.status(500).json({
                msg: "Falto agregar la coleccion permitida a buscar."
            });
    }
}

module.exports = {
    search
}