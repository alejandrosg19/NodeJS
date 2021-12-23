const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares funciones que añaden mas funcionalidades al web server
        //función que siempre se ejeuta cuando levantamos el servidor
        this.middlewares(); 
        //Rutas de mi app
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use( cors() )

        //Parseo y lectura del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') )
    }
    
    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Corriendo por el puerto: ', this.port);
        })
    }
}

module.exports = Server