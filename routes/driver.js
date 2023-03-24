/*
    Rutas de Drivers
    host + /api/driver
*/


const { Router} = require('express')
const {check} = require ('express-validator')
const { validateFiels } = require('../middlewares/validate-fils')


const {createDriver, getAllDrivers, updateDriver,deleteDriver,filterByAvailable,filterByNumberDocument,getDriverInRadius3Km} = require('../controllers/driver')

const router = Router()
/**
 * @swagger
 * /api/driver/:
 *   get:
 *     summary: Obtiene una lista de todos los conductores
 *     tags:
 *       - Conductor
 *     responses:
 *       '200':
 *         description: Lista de conductores obtenida correctamente
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
 *                   description: Lista de conductores
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Identificador único del conductor
 *                       name:
 *                         type: string
 *                         description: Nombre del conductor
 *                       number_document:
 *                         type: number
 *                         description: Número de documento del conductor
 *                       available:
 *                         type: boolean
 *                         description: Indica si el conductor está disponible
 *                       location:
 *                         type: object
 *                         description: Ubicación del conductor en formato GeoJSON
 *                         properties:
 *                           type:
 *                             type: string
 *                             description: Tipo de ubicación (en este caso, siempre "Point")
 *                           coordinates:
 *                             type: array
 *                             description: Coordenadas de la ubicación en formato [longitud, latitud]
 *                             items:
 *                               type: number
 *                     example:
 *                       _id: "607e066cb95b4f0b7c7461f3"
 *                       name: "Juan Perez"
 *                       number_document: 123456789
 *                       available: true
 *                       location:
 *                         type: "Point"
 *                         coordinates: [-34.603722, -58.381592]
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/',getAllDrivers)

/**
 * @swagger
 * /api/driver/new:
 *   post:
 *     summary: Crea un nuevo conductor
 *     tags:
 *       - Conductor
 *     requestBody:
 *       required: true
 *       description: Objeto JSON con los datos del conductor a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del conductor
 *               number_document:
 *                 type: number
 *                 description: Número de documento del conductor
 *               available:
 *                 type: boolean
 *                 description: Indica si el conductor está disponible
 *               location:
 *                 type: object
 *                 description: Ubicación del conductor en formato GeoJSON
 *                 properties:
 *                   type:
 *                     type: string
 *                     description: Tipo de ubicación (en este caso, siempre "Point")
 *                   coordinates:
 *                     type: array
 *                     description: Coordenadas de la ubicación en formato [longitud, latitud]
 *                     items:
 *                       type: number
 *             required:
 *               - name
 *               - number_document
 *               - available
 *               - location
 *             example:
 *               name: "Juan Perez"
 *               number_document: 123456789
 *               available: true
 *               location:
 *                 type: "Point"
 *                 coordinates: [-34.603722, -58.381592]
 *     responses:
 *       '200':
 *         description: Conductor creado correctamente
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
 *                   description: Objeto que representa al conductor creado
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Identificador único del conductor
 *                     name:
 *                       type: string
 *                       description: Nombre del conductor
 *                     number_document:
 *                       type: number
 *                       description: Número de documento del conductor
 *                     available:
 *                       type: boolean
 *                       description: Indica si el conductor está disponible
 *                     location:
 *                       type: object
 *                       description: Ubicación del conductor en formato GeoJSON
 *                       properties:
 *                         type:
 *                           type: string
 *                           description: Tipo de ubicación (en este caso, siempre "Point")
 *                         coordinates:
 *                           type: array
 *                           description: Coordenadas de la ubicación en formato [longitud, latitud]
 *                           items:
 *                             type: number
 *                   example:
 *                     _id: "607e066cb95b4f0b7c7461f3"
 *                     name: "Juan Perez"
 *                     number_document: 123456789
 *                     available: true
 *                     location:
 *                       type: "Point"
 *                       coordinates: [-34.603722, -58.381592]
 *       '500':
 *         description: Error interno del servidor
 */

router.post('/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('number_document','El numero de identificación es obligatorio').not().isEmpty(),
        check('available', 'El estado es requerido').not().isEmpty(),
        //check('coordinates', 'Las cordenadas deben ser un array de dos posiciones').isArray().isLength({ min: 2, max: 2 }),
        validateFiels

    ], createDriver)

/**
 * @swagger
 * /api/driver/{id}:
 *   put:
 *     summary: Actualiza los datos de un conductor existente.
 *     tags:
 *      - Conductor
 *     description: Actualiza los datos de un conductor existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del conductor a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *           format: uid
 *           example: 6142d7e02912c54f2257aaf1
 *       - in: body
 *         name: driver
 *         description: Campos a actualizar del conductor.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             number_document:
 *               type: number
 *             available:
 *               type: boolean
 *             location:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: Point
 *                 coordinates:
 *                   type: array
 *                   items:
 *                     type: number
 *         example:
 *           name: Juan
 *           number_document: 123456789
 *           available: true
 *           location:
 *             type: Point
 *             coordinates: [-73.856077, 40.848447]
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
 *                     available:
 *                       type: boolean
 *                       example: true
 *                     location:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                             example: [-73.856077, 40.848447]
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
 *                   example: No existe conductor con ese id
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

router.put('/:id', updateDriver )

/**
 * @swagger
 * /api/driver/{id}:
 *   delete:
 *     summary: Elimina un conductor por su ID
 *     tags: 
 *       - Conductor
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del conductor a eliminar
 *     responses:
 *       200:
 *         description: Conductor eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Driver'
 *       400:
 *         description: El ID del conductor no es válido
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
 *                   example: No existe conductor con ese id
 *       500:
 *         description: Error al eliminar el conductor
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
 *                   example: No se pudo eliminar el conductor
 */
router.delete('/:id',deleteDriver)


/**
 * @swagger
 * /api/driver/available/{available}:
 *   get:
 *     summary: Obtiene los conductores disponibles o no disponibles
 *     tags:
 *      - Conductor
 *     parameters:
 *       - in: path
 *         name: available
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Indica si se quieren obtener conductores disponibles (true) o no disponibles (false).
 *     responses:
 *       200:
 *         description: Lista de conductores.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 drivers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       number_document:
 *                         type: number
 *                       available:
 *                         type: boolean
 *                       location:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             enum: [Point]
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *       400:
 *         description: No se encontraron conductores disponibles o no disponibles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: false
 *                 msg:
 *                   type: string
 *                   example: "No se pueden encontrar conductores"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: false
 *                 msg:
 *                   type: string
 *                   example: "Error"
 */
router.get('/available/:available', filterByAvailable)

/**
 * @swagger
 * /api/driver/{number_document}:
 *   get:
 *     summary: Buscar conductor por número de identificación
 *     description: Busca y retorna un conductor según su número de identificación
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: path
 *         name: number_document
 *         required: true
 *         description: Número de identificación del conductor a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la petición fue exitosa
 *                   example: true
 *                 driver:
 *                   type: object
 *                   description: Datos del conductor encontrado
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre del conductor
 *                       example: Juan Pérez
 *                     number_document:
 *                       type: integer
 *                       description: Número de identificación del conductor
 *                       example: 123456789
 *                     available:
 *                       type: boolean
 *                       description: Indica si el conductor está disponible o no
 *                       example: true
 *                     location:
 *                       type: object
 *                       description: Coordenadas de ubicación del conductor
 *                       properties:
 *                         type:
 *                           type: string
 *                           description: Tipo de geometría
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           description: Array de coordenadas [longitud, latitud]
 *                           items:
 *                             type: number
 *                             example: [-71.0589, 42.3601]
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la petición falló
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: No hay registrado un conductor con ese número de ID
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la petición falló
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Error
 */
router.get('/id/:number_document', filterByNumberDocument)
/**
 * @swagger
 * /api/driver/filter_distance:
 *   post:
 *     summary: Busca conductores disponibles a una distancia de 3 km desde una ubicación dada
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Coordenadas de ubicación de partida en formato JSON
 *         schema:
 *           type: object
 *           required:
 *             - location
 *           properties:
 *             location:
 *               type: object
 *               properties:
 *                 lan:
 *                   type: number
 *                 lng:
 *                   type: number
 *     responses:
 *       200:
 *         description: Devuelve una lista de conductores disponibles a 3 km de distancia desde la ubicación dada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driversFilter:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Driver'
 *       400:
 *         description: Error si no se proporciona la ubicación de partida o si no hay conductores disponibles a 3 km de distancia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error si ocurre un problema en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */

router.post('/filter_distance', getDriverInRadius3Km)




module.exports = router
