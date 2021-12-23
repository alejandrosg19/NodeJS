const {
    input,
    pausa,
    inquirerMenu,
    listadoCiudades
} = require("./helpers/inquirer");
const Busqueda = require("./models/busquedas");
require('dotenv').config();

const main = async () => {

    let opc;
    const busqueda = new Busqueda();

    do{
        opc = await inquirerMenu();

        if (opc === 0) return;

        switch (opc) {
            case 1:
                // Recibir nombre de ciudad
                const ciudad = await input('Ciudad a buscar: ');

                // Buscar ciudades
                const ciudades = await busqueda.buscarCiudad(ciudad);

                // Seleccionar ciudad
                const idSelect = await listadoCiudades(ciudades);
                if (idSelect === '0') continue;

                //Buscar info de ciudad selecionada
                const ciudadSelect = ciudades.find( ciudad => ciudad.id === idSelect);
                
                // Guardar ciudad en DB para el historial
                busqueda.agregarrHistorial(ciudadSelect.nombre); 
                
                // Buscar clima
                const resultClima = await busqueda.buscarClima(ciudadSelect.lat, ciudadSelect.lng);

                console.log('\nIformación de la Ciudad\n');
                console.log('Ciudad: ', ciudadSelect.nombre.green);
                console.log('Lat: ', ciudadSelect.lat);
                console.log('Lng ', ciudadSelect.lng);
                console.log('Temperatura: ', resultClima.desc.green);
                console.log('Maxima: ', resultClima.max);
                console.log('Minima: ', resultClima.max);
                console.log('Promedio: ', resultClima.temp);
            break;
            case 2:
                busqueda.historialCapitalizado.forEach( (ciudad, idx) =>{
                    console.log(`${idx + 1}.`.green + `${ciudad}`)
                })
            break;
            case 3:
                console.log("Opción 3");
            break;
        }

        await pausa();

    }while(opc !== 0)
}

main();