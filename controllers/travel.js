const { response } = require("express");
const Travel = require("../models/Travel");
const Passenger = require("../models/Passenger");   
const Driver = require("../models/Driver");   


const {getDistance} = require('../helpers/getDistance')

const createTravel = async (req, res = response) => {
    const {start, end} = req.body
    
    try {
      const passenger = await Passenger.findOne({ number_document: String(req.body.passenger) });
      if (!passenger) {
        return res.status(400).json({
          ok: false,
          msg: "El pasajero no existe",
        });
      }

      const distance =getDistance(start.coordinates[0], start.coordinates[1], end.coordinates[0], end.coordinates[1])
      const RATE_FOR_KM = 0.8;
      const costTravel =Math.ceil (distance * RATE_FOR_KM);     
      const travel = new Travel({
        cost: costTravel,
        start: req.body.start,
        end: req.body.end,
        state: 'SOLICITADO',
        driver: req.body.driver,
        passenger: passenger._id,
      });
  
      const travelSave = await travel.save();
  
      return res.status(200).json({
        ok: true,
        event: travelSave,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al solicitar un viaje",
      });
    }
  };

const finishTravel = async ( req, res = response) => {
  try {
    
    const {end} = req.body
    const driver = await Driver.findOne({ number_document: String(req.body.driver) });
    if (!driver) {
      return res.status(400).json({
        ok: false,
        msg: "El conductor no existe y no puede finalizar el viaje",
      });
    }

    const travel =  await Travel.findOne({state: 'EN PROGRESO'})
    console.log(travel)
    const distance =getDistance(end.coordinates[0], end.coordinates[1], travel.end.coordinates[0], travel.end.coordinates[1])
    if(distance !== 0 ){
        return res.status(401).json({
            ok: false,
            msg: "No puedes finalizar el viaje no has llegado al destino",
          });
    }

    const newTavel = {
        ['state']: 'FINALIZADO'
      };
 
    const travelSave = await Travel.findByIdAndUpdate(travel.id, newTavel,{
        new:true
    })
    
    return res.status(200).json({
        ok: true,
        event: travelSave,
      });
      
  } catch (error) {
    console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al finalizar  un viaje",
      });
  }

}
  module.exports = {
    createTravel,
    finishTravel
  };

