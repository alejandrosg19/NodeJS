const { describe } = require('yargs');

const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true, //Valor obligatorio
            describe: "Base para sacar tabla de multiplicar"
        },
        'l': {
            alias: 'listar',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: "True para mostrar la tabla en pantalla"
        },
        'h':{
            alis: 'hasta',
            type: 'number',
            demandOption: false,
            default: 10,
            describe: 'Hasta que numero quiere que se haga la tabla de multiplicar'
        }
    })
    .check((argv, options) =>{
            if(isNaN(argv.b) || isNaN(argv.h)){
                throw 'La base tiene que ser numero';
            }   

            return true;
    })
    .argv;

module.exports = argv;