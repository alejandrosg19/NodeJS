require('colors');
const Tareas = require('./models/tareas');
const Database = require('./helpers/database');
const { 
    inquirerMenu,
    pausa,
    input,
    listadoTareasBorrar,
    confirmar ,
    mostrarListadCheckList
} = require('./helpers/inquirer');


const main = async() =>{
    let opt = '';
    const tareas = new Tareas();
    const database = new Database('./db/data,json');
    const tareasDB = database.leerDB();
    
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt = await inquirerMenu();  //Esperando respuesta para que el usuario seleccione una opción.

        switch (opt) {
            case '1':
                const desc = await input('Descripcón:');
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.listadoTareas();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadCheckList(tareas.listadoArray);
                tareas.toggleTareas( ids );
            break;
            case '6':
                const opc = await listadoTareasBorrar(tareas.listadoArray);
                if( opc !== '0'){
                    const ok = await confirmar()
                    console.log(ok);
                    if(ok){
                        tareas.eliminarTarea(opc);
                        console.log("Tarea eliminada correctamente");
                    }
                }
            break;
        }

        database.guardarDB( tareas.listadoArray );
        
        if( opt !== '0') await pausa(); //Esperando respuesta para que el usuario de Enter
        
    }while(opt !== '0')
    
}

main();