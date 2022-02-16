const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description:{
        type: String
    },
    aviability: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function(){ 
    //Excluimos dos campos y devolvermos los demas incluidos en la variable user (__v es un campo que agrega mongo), con el this.toObject()
    //obtenemos todos los campos en un solo objeto.
    const { __v, state, ...data} = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);