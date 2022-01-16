const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/coffeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion de la db'); 
    }
}

module.exports = {
    dbConnection
}