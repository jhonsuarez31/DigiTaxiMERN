const express = require('express')
const dotenv = require('dotenv').config()

const {dbConnection} = require('./db/config')
//Crear el servidor de exprres
console.log('loading...')
const app = express();


//Conexión a la base de datos con mongoose
dbConnection()
const swagger = require('./routes/swagger');
swagger(app);
//Directorio Public
app.use( express.static('public'))

//Lectura y parseo del body 
app.use(express.json())

//rutas
// rutas driver  
app.use('/api/driver', require('./routes/driver'))
app.use('/api/passenger', require('./routes/passenger'))
app.use('/api/travel', require('./routes/travel'))



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})