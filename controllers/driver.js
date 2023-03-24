const { response } = require("express");
const { getDistance } = require('../helpers/getDistance')
const Driver = require("../models/Driver");


const createDriver = async (req, res = response) => {
  const driver = new Driver(req.body); 
  console.log(driver);
  try {
    const driverSave = await driver.save();
    return res.json({
      ok: true,
      event: driverSave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al registar un conductor",
    });
  }
};

const getAllDrivers = async (req, res = response) => {
  const drivers = await Driver.find();
  return res.json({
    ok: true,
    msg: drivers,
  });
};

const updateDriver = async (req, res = response) => {
  const driverID = req.params.id;
  try {
    const driver = await Driver.findById(driverID);

    if (!driver) {
      return res.status(400).json({
        ok: false,
        msg: "No existe conductor con ese id",
      });
    }
    const newDriver = {
      ...req.body,
    };

    const driverUpdate = await Driver.findByIdAndUpdate(driverID, newDriver, {
      new: true,
    });

    return res.json({
      ok: true,
      event: driverUpdate,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "No se pudo actualizar los datos",
    });
  }
};

const deleteDriver = async (req, res = response) => {
  const driverID = req.params.id;
  try {
    const driver = await Driver.findById(driverID);

    if (!driver) {
      return res.status(400).json({
        ok: false,
        msg: "No existe conductor con ese id",
      });
    }

    const driverDelete = await Driver.findByIdAndDelete(driverID);

    return res.json({
      ok: true,
      event: driverDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo eliminar el conductor",
    });
  }
};

const filterByAvailable = async (req, res = response) => {
  try {
    const available = req.params.available;
    
    if (available === false) {
      return res.status(400).json({
        ok: false,
        msg: "No se pueden encontrar conductores ",
      });
    }
    const drivers = await Driver.find({ available });
    return res.status(200).json({
      ok: true,
      drivers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error ",
    });
  }
};

const filterByNumberDocument = async (req, res = response) => {
  try {
    const number_document = req.params.number_document;

    const driver = await Driver.find({ number_document });
    if (driver.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No hay registrado un conductor con ese número de ID",
      });
    }
    return res.status(200).json({
      ok: true,
      driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error ",
    });
  }
};

const getDriverInRadius3Km = async ( req, res = response) =>{
  
  const { location: { lan, lng } } = req.body;
    try {
      const drivers = await Driver.find()

      const driversFilter = drivers.filter( driver  =>{
        const distance = getDistance(lan,lng,driver.location.coordinates[0],driver.location.coordinates[1])
        return distance === 3 && driver.available === true
      })
      return res.status(200).json({
        driversFilter
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error ",
      });
    }
 
}
module.exports = {
  createDriver,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  filterByAvailable,
  filterByNumberDocument,
  getDriverInRadius3Km
};
