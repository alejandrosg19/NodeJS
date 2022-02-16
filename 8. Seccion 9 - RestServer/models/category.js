const { model, Schema } = require("mongoose");

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoria es obligatorio"],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function(){ 
    //Excluimos dos campos y devolvermos los demas incluidos en la variable user (__v es un campo que agrega mongo), con el this.toObject()
    //obtenemos todos los campos en un solo objeto.
    const { __v, state, ...data} = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);