const { v4: uuidv4 } = require('uuid');
const path = require('path');

const defaultExtensions = ['png', 'jgp'];

const validarTipoArchivo = ( files, extensionesValidas = defaultExtensions, carpeta = '') => {

    return new Promise( ( resolve, reject ) => {
        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1  ];

        if( !extensionesValidas.includes( extension ) ){
            reject(`La extensión ${ extension } no es valida, solo se permiten las siguientes: ${ extensionesValidas }`);
        }

        const nombreFinal =  uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreFinal);

        //Se mueve el archivo a la ubicación destinada
        archivo.mv(uploadPath, (err) => {
            if (err) return reject(err)
            
            resolve( nombreFinal )
        });
    })
}

module.exports = {
    validarTipoArchivo
}