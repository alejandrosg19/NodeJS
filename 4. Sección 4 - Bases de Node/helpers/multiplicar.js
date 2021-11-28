const fs = require('fs');

//Retorna directamente una promesa
const CrearTablaMultiplicarPromise = numero=>{
    return new Promise((resolve, reject)=>{
        let salida = '';

        for(let x=1; x<=10; x++){
            salida += `${numero} * ${x} = ${numero*x} \n`;
        }

        fs.writeFileSync(`./tablas/1.${numero} tabla-${numero}.txt`, salida)

        console.log(salida);
        
        resolve(`Tabla ${numero} creada correctamente`);
    })
}

//Retorna una promesa a partir del Async
const CrearTablaMultiplicarAsync = async (base, listar, hasta)=>{
    try {
        let salida = '';

        for(let x=1; x<=hasta; x++){
            salida += `${base} * ${x} = ${base*x} \n`;
        }

        fs.writeFileSync(`./tablas/1.${base} tabla-${base}.txt`, salida)

        if (listar) console.log(salida);
        
        return `Tabla ${base} creada correctamente`;

    } catch (error) {
        throw error
    }
}

module.exports = {
    CrearTablaPromise: CrearTablaMultiplicarPromise,
    CrearTablaAsync: CrearTablaMultiplicarAsync
}