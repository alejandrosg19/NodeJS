const { request, response, query } = require('express');
const { Product, Category } = require('../models/index');

const obtenerProductos = async ( req = request, res = response ) => {

    const { limite=5, desde=0 } = req.query

    const query = { state: true }

    const [ totalProductos, productos ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
        .populate('user', 'name')
        .populate('category', 'name')
        .limit( Number(limite) )
        .skip( Number(desde) ),

    ])

    res.json({
        totalProductos,
        productos
    })
} 

const obtenerProductoById = async ( req = request, res = response ) => {
    const { id } = req.params

    const product = await Product.findById( id )
                    .populate( 'user', 'name' )
                    .populate( 'category', 'name' )

    if( !product.state ){
        return res.status(400).json({
            msg: "El producto no se encuentra activo - state: false"
        })
    }

    res.json({
        product
    })
}

const crearProducto = async ( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();
    const { price, category, description } = req.body

    const productExistente = await Product.findOne({ name });

    if( productExistente ){
        return res.status(400).json({
            msg: `Ya existe un producto con el nombre ${ name }`
        });
    }

    const categoryExist = await Category.findOne({ "name": category.toUpperCase() });

    if( !categoryExist ){
        return res.status(400).json({
            msg: `No existe ninguna categoria con el nombre de ${ category } para asociarla al producto`
        });
    }

    const data = {
       name,
       user: req.user._id,
       price,
       category: categoryExist._id,
       description
    }

    const newProduct = await Product(data);
    newProduct.save();

    res.json({
        newProduct
    })
}

const actualizarProduct = async ( req = request, res = response ) => {

    const { id } = req.params;
    const category = req.body.category.toUpperCase();
    const { user, state, ...data } = req.body

    if( data.name ){
        data.name = data.name.toUpperCase();
    }

    const categoryExist = await Category.findOne({ 'name': category });
    if( !categoryExist){
        return res.status(400).json({
            msg: `La categoria ${ category } a la que quiere cambiar el producto no existe`
        })
    }

    data.user = req.user._id;
    data.category = categoryExist._id;

    const productUpdate = await Product.findByIdAndUpdate( id, data, { new: true })

    res.json({
        productUpdate
    })
}

const eliminarProducto = async ( req = request, res = response ) => {
    const { id } = req.params
    
    const product = await Product.findById( id );

    if( !product.state ){
        return res.status(400).json({
            msg: "El producto ya esta eliminado"
        });
    }

    const deleteProduct = await Product.findByIdAndUpdate( id, { state: false }, { new: true })

    res.json({
        deleteProduct
    })
}


module.exports = {
    obtenerProductos,
    obtenerProductoById,
    crearProducto,
    actualizarProduct,
    eliminarProducto
}