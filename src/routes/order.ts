import { Router } from "express"
import { Orderaddcont, Orderhistorycont } from "../controllers"
import checkauthentication from "../utils/varifyjwt"
import { Ordervalid } from "../validators"
const OrderRouter = Router()
/**
 * @swagger
 * tags:
 *  name: order
 * /order:
 *  post:
 *      tags: [order]
 *      description: Login User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          Productlist:
 *                              type: array
 *                              items:
 *                                  properties:
 *                                      Qty:
 *                                          type: number
 *                                      Productid:
 *                                          type: string
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

OrderRouter.post('/', checkauthentication,Ordervalid,Orderaddcont)
/**
 * @swagger
 * /order/history:
 *  get:
 *      tags: [order]
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Order History.
 *           404:
 *              description: Sorry no Order History
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
OrderRouter.get('/history', checkauthentication,Orderhistorycont)
export default OrderRouter