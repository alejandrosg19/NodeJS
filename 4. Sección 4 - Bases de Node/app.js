const { option } = require("yargs");
const {CrearTablaPromise, CrearTablaAsync} = require("./helpers/multiplicar");
const argv = require('./config/yargs');


console.clear()
console.log(`base: ${argv.b}, listar: ${argv.l}, hasta: ${argv.h}`);


/** 
 * * Haciendo uso de argumentos enviados desde consola con procces.argv 
const [ , , arg3 = '--base=5'] = process.argv
const [ , base = '5'] = arg3.split('=');
console.log(base)
*/


/** 
 * * Creando Tabla a partir de función que retorna promesa directamente
CrearTablaPromise(base)
        .then(res=>console.log(res))
        .catch(err=>{throw(err)});
*/


/** 
 * * Creando Tabla a partir de función que retorna promesa con async
*/
CrearTablaAsync(argv.b, argv.l, argv.h)
        .then(res=>console.log(res))
        .catch(err=>{throw(err)});



