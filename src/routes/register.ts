import { Router } from "express";
import { Registercont } from "../controllers";
import { Registervalid } from "../validators";

const RegisterRouter = Router()

/**
 * @swagger
 * tags:
 *  name: register
 * /register:
 *  post:
 *      tags: [register]
 *      description: create User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Congratulation! User is Registered
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error
 */

RegisterRouter.post('/', Registervalid, Registercont)
export default RegisterRouter