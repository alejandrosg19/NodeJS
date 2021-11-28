"use strict";

//Sin callbacks
const getInfoUser = id=>{
    const user = {
        id,
        nombre: "Santiago Alejandro"
    }

    setTimeout(() => {
        console.log("Imprimiendo Usuario Sin Callback /n", user);
    }, 1500);
}
getInfoUser(19);

//Con callbacks
const getInfoUserCallback = (id, callback) =>{
    const user = {
        id,
        nombre: "Santiago Alejandro"
    }
    
    setTimeout(() => {
        callback(user);
    }, 1500);
}

getInfoUserCallback(19, ({id, nombre})=>{
    console.log("Imprimiendo Usuario Con Callback /n", id, nombre);
})