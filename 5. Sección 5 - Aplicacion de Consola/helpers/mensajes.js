const { read } = require('fs');

require('colors');

const mostrarMenu = () => {
    return new Promise((resolve, reject) => {

        console.clear();
        console.log("=======================".green);
        console.log("  Seleccione una Opción".green);
        console.log("=======================\n".green);

        console.log(` ${ '1.'.green } Crear Tarea`);
        console.log(` ${ '2.'.green } Listar Tareas`);
        console.log(` ${ '3.'.green } Listar Tareas Completadas`);
        console.log(` ${ '4.'.green } Listar Tareas Pendientes`);
        console.log(` ${ '5.'.green } Completar Tarea(s)`);
        console.log(` ${ '6.'.green } Borrar Tarea`);
        console.log(` ${ '7.'.green } Salir \n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Selección una Opción: ', opt => {
            readLine.close();
            resolve(opt);
        });
    })
} 

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`Presione ${ 'ENTER'.green } para continuar`, () => {
            readLine.close();
            resolve();
        });
    })
}

module.exports = {
    mostrarMenu,
    pausa
}