const fs = require('fs');
const axios = require('axios');

class Busqueda{
    historial = []
    dbPath = '';

    constructor(){
        this.dbPath = './database/db.json';
        this.leerDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenweathermap(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map( ciudad => {
            let palabras = ciudad.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        })
    }

    async buscarCiudad( ciudad ){
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ ciudad }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( ciudad => ({ //no usamos {}, si no ({}) para indicar que devolveremos un objeto implicitamente.
                id: ciudad.id,
                nombre: ciudad.place_name,
                lat: ciudad.center[0],
                lng: ciudad.center[1]
            }));

        } catch (error) {
            console.log("error", error);
        }
        
        
    }

    async buscarClima(lat, lng){
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenweathermap, lat, lon: lng} //Ejemplo de cuando la key tiene el mismo nombre que el valor y cuando no.
            });
            
            const resp = await instance.get();

            const { weather, main} = resp.data;
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log('error', error);
        } 
    }

    agregarrHistorial( ciudad ){

        if( this.historial.includes( ciudad.toLocaleLowerCase() )) return;

        this.historial = this.historial.splice(0,5); //obligo a mantener la lista solo con 6 datos

        this.historial.unshift(ciudad.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload) );
    }

    leerDB(){
        if( !fs.existsSync( this.dbPath ) ) return

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

module.exports = Busqueda;