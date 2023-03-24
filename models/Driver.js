const { Schema, model } = require ('mongoose');

const driverSchema = Schema({
    name:{
        type: String,
        required: true
    },

    number_document:{
        type: Number,
        required: true,
        unique: true
    }, 
    available:{
        type: Boolean,
        required: true,
    },

    //GeoJsonFormat
    location:{
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
          },
          coordinates: {
            type: [Number],
            
          }      
    }
});

module.exports = model('Driver', driverSchema);
