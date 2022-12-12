import { Router } from "express";
import { Logincont } from "../controllers/logincontroller";
import { Logvalid } from "../validators"
const Loginroute=Router()
/**
 * @swagger
 * tags:
 *  name: login
 * /login:
 *  post:
 *      tags: [login]
 *      description: Login User
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
 * 
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Token will be generated
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Loginroute.post('/',Logvalid,Logincont)
export default Loginroute
