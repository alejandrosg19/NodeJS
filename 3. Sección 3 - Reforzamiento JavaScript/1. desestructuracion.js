"use strict";

const objetoPersona = {
    nombre: "Santiago",
    apellido: "Alejandro",
    edad: "23",

    getInfo(){
        return `${this.edad} ${this.apellido} ${this.edad}`;
    }
}

//Primer forma de obtener elementos del objeto
const nombre1 = objetoPersona.nombre;
const apellido1 = objetoPersona.apellido;
const edad1 = objetoPersona.edad;
console.log("Sin desctructurar:", nombre1, apellido1, edad1);

//Segunda fomta de obtener elementos del objeto, las variables tiene que tener el mismo nombre que los valores del objeto
const {nombre, apellido, edad, altura = "1,68"} = objetoPersona;
console.log("Con destructuración:", nombre, apellido, edad, altura);

//Tercera forma de destructuracón, en los parametros de una función
const funcDestructurar= ({nombre, apellido, edad})=>{
    console.log("Con destructuración en parametros de función:", nombre, apellido, edad);
}
funcDestructurar(objetoPersona);

console.log("DESTRUCTURACIÓN DE ARRAYS");
//Destructuración de arrays
const array = ["Santiago", "Alejandro", "Gonzalez"];
const val1 = array[0];
const val2 = array[1];
const val3 = array[2];
console.log("Array sin destructuración: ", val1, val2, val3);

//Destructando array completo
const [val4, val5, val6] = array;
console.log("Destructurando array completo: ", val4, val5, val6);

//Destructurando parte de un array
const [ , , val7] = array;
console.log("Destructurando parte del array: ", val6);