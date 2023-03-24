/*
    Rutas de Travel
    host + /api/travel
*/
const { Router} = require('express')
const {check} = require ('express-validator')
const { createTravel, finishTravel } = require('../controllers/travel')
const router = Router()
/**
 * @swagger
 * /api/travel/create_travel:
 *   post:
 *     summary: Crea un nuevo viaje
 *     tags:
 *       - Viaje
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                 required:
 *                   - type
 *                   - coordinates
 *               end:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                 required:
 *                   - type
 *                   - coordinates
 *               passenger:
 *                 type: string
 *                 description: Número de documento del pasajero
 *                 example: "123456789"
 *               driver:
 *                 type: string
 *                 description: ID del conductor
 *                 example: "60f43891d0768a10d872f5b4"
 *             required:
 *               - start
 *               - end
 *               - passenger
 *               - driver
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
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Travel'
 *                   description: Objeto de viaje creado
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: El pasajero no existe
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: false
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Error al solicitar un viaje
 *
 */
router.post('/create_travel', createTravel)
/**
 * @swagger
 * /api/travel/finish_travel:
 *   post:
 *     summary: Finaliza el viaje en progreso del conductor especificado
 *     tags:
 *       - Viaje
 *     requestBody:
 *       description: Objeto con la información del viaje a finalizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               end:
 *                 $ref: '#/components/schemas/Location'
 *               driver:
 *                 type: string
 *                 description: Número de documento del conductor que finaliza el viaje
 *             required:
 *               - end
 *               - driver
 *     responses:
 *       200:
 *         description: Viaje finalizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   $ref: '#/components/schemas/Travel'
 *       400:
 *         description: El conductor especificado no existe o no tiene un viaje en progreso
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
 *                   example: El conductor no existe o no tiene un viaje en progreso
 *       401:
 *         description: El conductor no ha llegado al destino del viaje en progreso
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
 *                   example: No puedes finalizar el viaje no has llegado al destino
 *       500:
 *         description: Error al finalizar el viaje
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
 *                   example: Error al finalizar el viaje
 */

router.post('/finish_travel', finishTravel)



module.exports = router
