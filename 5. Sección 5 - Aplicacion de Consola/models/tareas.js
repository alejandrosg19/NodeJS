const Tarea = require('./tarea');


class Tareas{

    _listado = {}

    constructor(){
        this._listado = {}
    }

    get listadoArray(){
        const listado = []

        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key]);
        }) 

        return listado
    }

    crearTarea( desc ){
        let tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    listadoTareas(){
        let data_to_print = "";

        this.listadoArray.forEach( (tarea, number) => {
            let estado = ( tarea.completadoEn ) ? 'completado'.green : 'pendiente'.red;
            data_to_print += `${number + 1}.`.green + ` ${tarea.desc} :: ${estado}\n`;
        })

        console.log(data_to_print)
    }

    listarPendientesCompletadas( completadas = true){
        let data_to_print = "";
        let contador = 0;

        this.listadoArray.forEach( (tarea, number) => {
            if ( completadas){
                if( tarea.completadoEn){
                    contador ++;
                    data_to_print += `${contador}.`.green + ` ${tarea.desc} :: ${ tarea.completadoEn }\n`;
                }
            }else{
                if( !tarea.completadoEn ){
                    contador ++;
                    data_to_print += `${contador}.`.green + ` ${tarea.desc} :: ${ 'pendiente'.red }\n`;
                }
            }
        });

        console.log(data_to_print);
    }

    eliminarTarea( id ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    toggleTareas( ids ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                //Llamamos por referencia la tarea.
                tarea.completadoEn = new Date().toISOString();
            }
        })

        //usamos el foreach en el metodo get del listado de tareas.
        this.listadoArray.forEach( tarea => {
            //no usamos referencia
            if(ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }


}

module.exports = Tareas;