//Collback hell es un problema paa los desarrolladores, ya que al estar usando callbacks anindados llamandosen entre si, resulta complejo intentar
//leer el codigo. EJEMPLO:

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

const getEmpleado = (id, callback)=>{
    const empleado = empleados.find(e=>e.id === id)?.nombre;

    if(empleado) callback(null, empleado);
    else callback(`Empleado con id: ${id} no existe`, null);
}

const getSalario = (id, callback)=>{
    const salario = salarios.find(s=>s.id === id)?.salario; //Operador null check operator, si el valor es diferente de null o undefined ejecuta la linea siguiente.

    if(salario) callback(null, salario)
    else callback(`El empelado con id ${id} no posee salario`, null)
}

getEmpleado(id, (error, empleado)=>{
    if(error) return console.log('ERROR: ', error);
    
    getSalario(id, (error, salario)=>{
        if(error) console.log('ERROR: ', error)
        else return console.log("El empleado", empleado, "tiene un salario de: ", salario);
    })
    
})

