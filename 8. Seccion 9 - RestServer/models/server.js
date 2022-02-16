const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:     '/api/auth',
            category: '/api/category',
            product: '/api/product',
            search:   '/api/search',
            user:     '/api/users'
        }
        
        //Conexion a la base de datos
        this.conectionDB();

        //Middlewares funciones que añaden mas funcionalidades al web server, son funciones que se 
        //ejecutan antes de llamar a un controlador o seguir con la ejecución de mis peticiones
        //función que siempre se ejeuta cuando levantamos el servidor
        this.middlewares(); 
        //Rutas de mi app
        this.routes();
    }

    async conectionDB(){
        await dbConnection();
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

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.user, require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Corriendo por el puerto: ', this.port);
        })
    }
}

module.exports = Server