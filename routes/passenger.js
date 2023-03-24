/*
    Rutas de Passenger
    host + /api/passenger
*/


const { Router} = require('express')
const {check} = require ('express-validator')
const { validateFiels } = require('../middlewares/validate-fils')

const {createPassenger, getAllPassenger, updatePassenger,deletePassenger } = require('../controllers/passenger')


const router = Router()
/**
 * @swagger
 * /api/passenger/:
 *   get:
 *     summary: Obtiene una lista de todos los pasajeros
 *     tags:
 *       - Pasajero
 *     responses:
 *       '200':
 *         description: Lista de pasajeros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación se realizó correctamente
 *                 msg:
 *                   type: array
 *                   description: Lista de pasajeros
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Identificador único del pasajero
 *                       name:
 *                         type: string
 *                         description: Nombre del pasajero
 *                       number_document:
 *                         type: number
 *                         description: Número de documento del pasajero
 
 *                     example:
 *                       _id: "607e066cb95b4f0b7c7461f3"
 *                       name: "Juan Perez"
 *                       number_document: 123456789
 *                      
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/',getAllPassenger)
/**
 * @swagger
 * /api/passenger/new:
 *   post:
 *     summary: Crea un nuevo pasajero
 *     tags:
 *       - Pasajero
 *     requestBody:
 *       required: true
 *       description: Objeto JSON con los datos del pasajero a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del pasajero
 *               number_document:
 *                 type: number
 *                 description: Número de documento del pasajero
 *             
 *             required:
 *               - name
 *               - number_document
 *               
 *             example:
 *               name: "Juan Perez"
 *               number_document: 123456789
 *               
 *     responses:
 *       '200':
 *         description: Pasajero creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación se realizó correctamente
 *                 event:
 *                   type: object
 *                   description: Objeto que representa al pasajero creado
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Identificador único del pasajero
 *                     name:
 *                       type: string
 *                       description: Nombre del pasajero
 *                     number_document:
 *                       type: number
 *                       description: Número de documento del pasajero
 *                   
 *                   example:
 *                     _id: "607e066cb95b4f0b7c7461f3"
 *                     name: "Juan Perez"
 *                     number_document: 123456789
 *                  
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('number_document','El numero de identificación es obligatorio').not().isEmpty(),
        validateFiels

    ], createPassenger)

/**
 * @swagger
 * /api/passenger/{id}:
 *   put:
 *     summary: Actualiza los datos de un pasajero existente.
 *     tags:
 *      - Pasajero
 *     description: Actualiza los datos de un pasajero existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del pasajero a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *           format: uid
 *           example: 6142d7e02912c54f2257aaf1
 *       - in: body
 *         name: passenger
 *         description: Campos a actualizar del pasajero.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             number_document:
 *               type: number
 *             
 *         example:
 *           name: Juan
 *           number_document: 123456789
 *           
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       format: uuid
 *                       example: 6142d7e02912c54f2257aaf1
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     number_document:
 *                       type: number
 *                       example: 123456789
 *                    
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No existe pasajero con ese id
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No se pudo actualizar los datos
 */    
    
router.put('/:id', updatePassenger )

/**
 * @swagger
 * /api/passenger/{id}:
 *   delete:
 *     summary: Elimina un pasajero por su ID
 *     tags: 
 *       - Pasajero
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del pasajero a eliminar
 *     responses:
 *       200:
 *         description: Pasajero eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Passenger'
 *       400:
 *         description: El ID del pasajero no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No existe pasajero con ese id
 *       500:
 *         description: Error al eliminar el pasajero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: No se pudo eliminar el pasajero
 */
router.delete('/:id', deletePassenger)

module.exports = router
