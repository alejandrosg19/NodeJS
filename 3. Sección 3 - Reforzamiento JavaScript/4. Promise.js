//Promesas remplazan a los calbacks hell

"use strict";

const empleados = [ 
    {
        id: 1,
        nombre: "Santigo"
    },
    {
        id: 2,
        nombre: "Alejandro"
    },
    {
        id: 3,
        nombre: "Gonzalez"
    },
]
const salarios = [ 
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
]

const id = 4;

const getEmpleado = id=>{
    return new Promise((resolve, reject)=>{
        const empleado = empleados.find(e=>e.id === id)?.nombre; //Operador null check operator, si el valor es diferente de null o undefined ejecuta la linea siguiente.
        
        empleado
            ? resolve(empleado)
            : reject(`Empleado con id: ${id} no existe`)
    })
}

const getSalario = (id, callback)=>{
    return new Promise((resolve, reject)=>{
        const salario = salarios.find(s=>s.id === id)?.salario;

        salario
            ? resolve(salario)
            : reject(`El empleado con id ${id} no posee salario`)
    })
}

let nombreEmpleado;

//Promesas en cadena
getEmpleado(id)
    .then(empleado => {
        nombreEmpleado = empleado;
        return getSalario(id);
    })
    .then(salario => console.log(`El empleado ${nombreEmpleado} posee un salario de: ${salario}`))
    .catch(error=>console.log(error));
