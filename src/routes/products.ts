import { Router } from "express";
import { disableproduct, Productaddcont, Productlistallcont, Productsinglecont, productuptcont } from "../controllers";
import { uploadthing } from "../utils/fileuploader";
import checkauthentication from "../utils/varifyjwt";
import { Productaddvalid, Productuptvalid } from "../validators";
const Productsroute = Router()

/**
 * @swagger
 * tags:
 *  name: products
 * /products:
 *  post:
 *      tags: [products]
 *      description: products User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          Productshortdescription:
 *                              type: string
 *                          Productlongdescription:
 *                              type: string
 *                          Productprice: 
 *                              type: number
 *                          Productdiscountprice:
 *                              type: number
 *                          Productname:
 *                              type: string
 *                          Productquantity:
 *                              type: number
 *                          productimages:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 *                          Category:
 *                              type: array
 *                              items:
 *                                   type: string
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Adding Product in System
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Productsroute.post('/', checkauthentication, uploadthing, Productaddvalid, Productaddcont)
/**
 * @swagger
 * /products:
 *  get:
 *      tags: [products]
 *      parameters:
 *          - name: offset         
 *            in: query
 *            schema:
 *              type: string   
 *          - name: category        
 *            in: query
 *            schema:
 *              type: string   
 *
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Listing of all the products
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Productsroute.get("/", Productlistallcont)
/**
 * @swagger
 * /products/{Productid}:
 *  get:
 *      tags: [products]
 *      parameters:
 *          - name: Productid         
 *            in: path
 *            required: true
 *            schema:
 *              type: string   
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Product Details fetching for single product
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Productsroute.get("/:Productid", Productsinglecont)
/**
 * @swagger
 * /products/{Productid}:
 *  patch:
 *      tags: [products]
 *      parameters:
 *          - name: Productid         
 *            in: path
 *            required: true
 *            schema:
 *              type: string   
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          Productshortdescription:
 *                              type: string
 *                          Productlongdescription:
 *                              type: string
 *                          Productprice: 
 *                              type: number
 *                          Productdiscountprice:
 *                              type: number
 *                          Productname:
 *                              type: string
 *                          productimages:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 *                          Category:
 *                              type: array
 *                              items:
 *                                   type: string
 *      responses:
 *           default:
 *              description: This is the default response for it
 *           200:
 *              description: Updated Product message
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Productsroute.patch("/:Productid", checkauthentication, uploadthing, Productuptvalid, productuptcont)
/**
 * @swagger
 * /products/{Productid}:
 *  delete:
 *      tags: [products]
 *      parameters:
 *          - name: Productid         
 *            in: path
 *            required: true
 *            schema:
 *              type: string   
 *      responses:
 *           default:
 *              description: This will disable/delete the product.
 *           200:
 *              description: Product Deleted Successfully.
 *           404:
 *              description: Sorry no data found
 *           400:
 *              description: Bad Request
 *           500:
 *              description: Sorry Database Connection Error      
 */
Productsroute.delete("/:Productid", checkauthentication, disableproduct)
export default Productsroute