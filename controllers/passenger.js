
const {response} = require('express')

const Passenger = require ('../models/Passenger')

const createPassenger = async (req , res = response) => {
    const passenger = new Passenger ( req.body) //Instanciamos el objeto con los datos del post 
    try {
        const passengerSave = await passenger.save()
        return res.json({
            ok: true,
            event: passengerSave,
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:'Error al registar un Pasajero'
        })
    }
}

const getAllPassenger = async (req, res =response ) =>{
    const passengers = await Passenger.find()
    return res.status(200).json({
        ok: true,
        msg: passengers,
      });
}

const updatePassenger = async ( req, res = response) =>{
    const passengerID = req.params.id
    try {
    const passenger = await Passenger.findById(passengerID)
    
    if(!passenger){
        return res.status(400).json({
            ok: false,
            msg: "No existe pasajero con ese id"
        })
    }
    const newPassenger = {
        ...req.body,
      };
    
    const passengerUpdate = await Passenger.findByIdAndUpdate(passengerID, newPassenger, {
        new:true
    })
    
    return res.json({
        ok: true,
        event: passengerUpdate,
      });

    } catch (error) {
      res.status(500).json({
      ok: false,
      msg: "No se pudo actualizar los datos",
    });  
    }
}

const deletePassenger = async ( req, res = response) =>{
    const passengerID = req.params.id
    try {
    const passenger = await Passenger.findById(passengerID);

    
    if(!passenger){
        return res.status(400).json({
            ok: false,
            msg: "No existe pasajero con ese id"
        })
    }

    const passengerDelete = await Passenger.findByIdAndDelete(passengerID)
    
    return res.json({
        ok: true,
        event: passengerDelete,
      });

    } catch (error) {
        console.log(error)
      res.status(500).json({
      ok: false,
      msg: "No se pudo eliminar el Pasajero",
    });  
    }
}
module.exports = {
    createPassenger,
    getAllPassenger,
    updatePassenger,
    deletePassenger   
}