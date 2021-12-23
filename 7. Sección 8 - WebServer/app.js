const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


//Renderizado con hbs -> handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

//Servir contenido statico
app.use( express.static('public'));

app.get('/', ( req, res ) =>{
    res.render('home', {
        titulo: "Curso de Node",
        nombre: "Santiago Gonzalez"
    });
})

app.get('/generic', ( req, res ) => {
    res.render('generic', {
        titulo: "Curso de Node",
        nombre: "Santiago Gonzalez"
    });
})

app.get('/elements', (req , res ) => {
    res.render('elements', {
        titulo: "Curso de Node",
        nombre: "Santiago Gonzalez"
    });
})

app.get('*', ( req, res ) => {
    res.render('404');
})

app.listen(port, () => {    
    console.log(`Escuchando por el puerto http://localhost/${port}`)
})