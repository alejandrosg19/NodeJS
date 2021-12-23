const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: "Escoga una de las opciónes",
        choices: [
            {
                value: 1,
                name: ` ${ '1.'.green } Buscar Ciudad`
            },
            {
                value: 2,
                name: ` ${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: ` ${ '0.'.green } Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log("=======================".green);
    console.log("  Seleccione una Opción".white);
    console.log("=======================\n".green);

    //Debemos destructurar el objeto que devuelve inquirer, obteniendo el valor name que le di al objeto 'preguntas'
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() =>{
    const messagePausa = {
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'ENTER'.green } para continuar`
    }

    console.log('\n'); 
    await inquirer.prompt(messagePausa);
}

const input = async message => {
    const objInquirer = {
        type: 'input',
        name: 'input',
        message,
        validate( value ){
            if( value.length === 0){
                return "Por favor ingrese un valor";
            }

            return true;
        }
    }

    //Debemos destructurar el objeto que devuelve inquirer, obteniendo el valor name que le di al objeto 'objInquirer'
    const { input } = await inquirer.prompt(objInquirer);

    return input
}

const listadoCiudades = async ciudades => {
    console.clear();

    const choices = ciudades.map( (ciudad, i) => { 
        return{
            value: ciudad.id,
            name: `${i + 1}.`.green + `${ciudad.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '\n Selecciona la ciudad: ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async message =>{
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = inquirer.prompt(question);

    return ok;
}

const mostrarListadCheckList = async tareas => {
    console.clear();

    const choices = tareas.map( (tarea, i) => { 
        return{
            value: tarea.id,
            name: `${i + 1}.`.green + `${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '\n Seleccione', 
            choices
        }
    ]

    const { ids} = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    input,
    listadoCiudades,
    confirmar,
    mostrarListadCheckList
}