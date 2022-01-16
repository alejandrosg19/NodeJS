const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    roleValidate,
    emailExist,
    idExist
}