const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El el nombre es obligarotio"]
    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "La constraseña es obligatoria"]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//Editamos metodo propio del modelo user de mongoose para que me devuelta solo ciertos campos
UserSchema.methods.toJSON = function(){ 
    //Excluimos dos campos y devolvermos los demas incluidos en la variable user (__v es un campo que agrega mongo), con el this.toObject()
    //obtenemos todos los campos en un solo objeto.
    const { __v, password, ...user} = this.toObject();

    return user;
}

module.exports = model( 'User', UserSchema );