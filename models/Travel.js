const { Schema, model } = require("mongoose");

const travelSchema = Schema({
  cost: {
    type: Number,
  },
  start: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  end: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  state:{
    type: [String],
    required:true,
    enum:['SOLICITADO','INICIADO', 'EN PROGRESO', 'FINALIZADO']
  },

  driver:{
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  passenger:{
    type: Schema.Types.ObjectId,
    ref: 'Passenger',
  }

});

module.exports = model('Travel', travelSchema)