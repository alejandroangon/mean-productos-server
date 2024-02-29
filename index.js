const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Creanding el servidor
const app = express();

//Conectanding a la BDD
conectarDB();
app.use(cors());

app.use(express.json())

app.use('/api/productos',require('./routes/producto'))

app.listen(4000,()=>{
    console.log("El server esta corriendo")
})