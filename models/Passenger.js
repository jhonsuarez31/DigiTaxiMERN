const { Schema, model} = require('mongoose')

const passengerSchema = Schema({
    name:{
        type: String,
        required: true
    },

    number_document:{
        type: Number,
        required: true,
        unique: true
    }

})

module.exports = model('Passenger', passengerSchema)