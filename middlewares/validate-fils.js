const {response} = require('express-validator')

const { validationResult } = require('express-validator')


const validateFiels = (req, res = response, next) =>{
  
    //Manejo de errores 
  const errors = validationResult(req)

  if( !errors.isEmpty()){
      return res.status(400).json({
          ok: false,
          errors: errors.mapped()
      })
  }
  console.log('hola')
  next()
}

module.exports ={
    validateFiels
}



