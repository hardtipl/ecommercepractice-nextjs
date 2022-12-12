import { Router } from "express";
import { Checkoutcont } from "../controllers/checkcontroller";
import { Checkoutvalid } from "../validators";

const Checkoutroute=Router()
/**
 * @swagger
 * tags:
 *  name: Checkout
 * /checkout:
 *  post:
 *      tags: [Checkout]
 *      description: Checkout
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          Billingaddress:
 *                              type: object
 *                              properties:
 *                                  Country:
 *                                      type: string
 *                                  State:
 *                                      type: string
 *                                  City:
 *                                      type: string
 *                                  Address:
 *                                      type: string
 *                          Shippingaddress:
 *                              type: object
 *                              properties:
 *                                  Country:
 *                                      type: string
 *                                  State:
 *                                      type: string
 *                                  City:
 *                                      type: string
 *                                  Address:
 *                                      type: string
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

Checkoutroute.post('/',Checkoutvalid,Checkoutcont)
export default Checkoutroute