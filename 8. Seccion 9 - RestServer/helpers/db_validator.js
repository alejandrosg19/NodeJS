const Role = require('../models/role');
const { User, Category, Product } = require('../models/index');

const roleValidate = async role => {
    const roleExist = await Role.findOne({ role });

    if ( !roleExist ) {
        throw new Error(`El rol '${ role }' no se encuentra registrado en DB`);
    }
}

const emailExist = async email => {
    const existEmail = await User.findOne({ email });
    
    if ( existEmail ) {
        throw new Error(`El correo '${ email }' ya se encuentra registrado en DB`);
    }
}

const idExist = async id => {
    const existId = await User.findById( id );
    
    if ( !existId ) {
        throw new Error(`El id '${ id }' no existe`);
    }
}

const idCategoryExist = async id => {
    const categoryId = await Category.findById( id );

    if( !categoryId ){
        throw new Error(`El id '${ id }' de la categoria no existe`);
    }
}

const idProductExist = async id => {
    const productExist = await Product.findById( id );

    if( !productExist ){
        throw new Error("No se encontro ningun producto con ese id");
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes( coleccion )

    if ( !incluida ){
        throw new Error(`La extensión ${ extension } no es valida, solo se permiten las siguientes: ${ colecciones }`)
    }

    return true
}

module.exports = {
    roleValidate,
    emailExist,
    idExist,
    idCategoryExist,
    idProductExist,
    coleccionesPermitidas
}