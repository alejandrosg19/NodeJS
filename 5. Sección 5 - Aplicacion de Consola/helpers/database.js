const fs = require('fs');

class Database{
    path = null;

    constructor( path ){
        this.path = path;
    }

    guardarDB( data ){
        fs.writeFileSync( this.path, JSON.stringify(data));
    }

    leerDB(){
        if(!fs.existsSync(this.path)) return null

        const data = fs.readFileSync(this.path, { encoding: 'utf-8'});

        return JSON.parse(data);
    }
}

module.exports = Database;