const mongoose = require('mongoose')

const dbConnection = async () =>{
    try {
       await mongoose.connect(process.env.DB_CNN)
        console.log('Base de datos Online')
    } catch (error) {
        console.log(error)
        throw new ('Error al conectarse a la base de datos')
    }
} 

module.exports  = {
    dbConnection
}