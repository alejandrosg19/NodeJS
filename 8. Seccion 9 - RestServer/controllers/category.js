const { request, response } = require('express');
const { Category, User } = require('../models/index');

const obtenerCategorias = async ( req = request, res = response ) => {
    
    const { desde = 0, limite = 5} = req.query;
    const query = { state:  true};

    const [ totalCategories, categories] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
        .populate( 'user', 'name' )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ])

    res.json({
        totalCategories,
        categories
    })
}

const obtenerIdCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById( id ).populate( 'user', 'name');

    if( !category.state ){
        return res.status(400).json({
            msg: "La categoria no se encuentra activa - state: false"
        });
    }

    res.json({
        category
    })
}

const crearCategoria = async ( req = request, res = response ) => {
    const name = req.body.name.toUpperCase();

    const category = await Category.findOne({ name });

    //Hay que darle return porque si no va a responder el json pero sigue con el flujo normal.
    if(category){
        return res.status(400).json({
            msg: `La categoria ${name} ya existe en la db`
        })
    }

    //Genrar la data a fuardar
    data = {
        name,
        user: req.user._id
    }

    const newCategory = new Category(data);
    await newCategory.save();

    res.json({
        msg: "Categoria creada correctamente",
        newCategory
    })
}

const actualizarCategoria = async( req = request, res = response ) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.name.toUpperCase();
    data.usuario = req.user._id;

    // new: true es para que devuelva el documento actualizado.
    const category = await Category.findByIdAndUpdate( id, data, { new: true });

    res.json({
        category
    })
}

const eliminarCategoria = async ( req = request, res = response ) => {
    const { id } = req.params;

    const category = await Category.findById( id );

    if( !category.state ){
        return res.status(400).json({
            msg: "Esta categoria ya esta eliminada"
        });
    }

    const deleteCategory = await Category.findByIdAndUpdate( id, {state: false}, { new: true });

    res.json({
        deleteCategory
    })
}

module.exports = {
    obtenerCategorias,
    obtenerIdCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}